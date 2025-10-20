#!/usr/bin/env python3
"""
Translation Update Script for NASNET Connect

This script performs three phases:
1. Updates English translations (Foreign→Starlink, Domestic→Iran)
2. Copies updated English translations to all locale files
3. Translates specific locale files using Google Translate API

Usage:
    # Phase 1+2 only (update English and copy to all locales)
    python translate_and_update.py
    
    # Phase 1+2+3 (translate specific locales)
    python translate_and_update.py --locales fa ar
    
    # Translate all locales
    python translate_and_update.py --all
"""

import json
import os
import sys
import time
import argparse
from pathlib import Path
from typing import Dict, List, Optional

# Try to import googletrans
try:
    from googletrans import Translator
    TRANSLATOR_AVAILABLE = True
except ImportError:
    TRANSLATOR_AVAILABLE = False
    print("Warning: googletrans not installed. Translation phase will be skipped.")
    print("Install with: pip install googletrans==4.0.0-rc1")


# Language code mapping
LOCALE_TO_GOOGLE_LANG = {
    'en': 'en',
    'ar': 'ar',
    'fa': 'fa',
    'fr': 'fr',
    'it': 'it',
    'ru': 'ru',
    'sk': 'sk',
    'sp': 'es',  # Spanish
    'tr': 'tr',
    'zh': 'zh-cn'
}

ALL_LOCALES = ['ar', 'fa', 'fr', 'it', 'ru', 'sk', 'sp', 'tr', 'zh']


class TranslationUpdater:
    def __init__(self, locales_dir: str = '.'):
        self.locales_dir = Path(locales_dir)
        self.translator = Translator() if TRANSLATOR_AVAILABLE else None
        
    def backup_file(self, file_path: Path):
        """Create a backup of the file."""
        backup_path = file_path.with_suffix(file_path.suffix + '.bak')
        if file_path.exists():
            import shutil
            shutil.copy2(file_path, backup_path)
            print(f"✓ Backed up: {file_path.name} → {backup_path.name}")
    
    def load_json(self, file_path: Path) -> Dict:
        """Load JSON file."""
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def save_json(self, file_path: Path, data: Dict):
        """Save JSON file with proper formatting."""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write('\n')  # Add newline at end
    
    def phase1_update_english(self):
        """Phase 1: Replace Foreign→Starlink and Domestic→Iran in English."""
        print("\n" + "="*60)
        print("PHASE 1: Updating English Translations")
        print("="*60)
        
        en_file = self.locales_dir / 'message.en.json'
        
        # Backup
        self.backup_file(en_file)
        
        # Load English translations
        data = self.load_json(en_file)
        translations = data.get('translations', {})
        
        # Count replacements
        foreign_count = 0
        domestic_count = 0
        
        # Replace in all translation values
        for key, value in translations.items():
            original_value = value
            
            # Replace Foreign with Starlink
            if 'Foreign' in value:
                value = value.replace('Foreign', 'Starlink')
                foreign_count += value.count('Starlink') - original_value.count('Starlink')
            
            # Replace Domestic with Iran
            if 'Domestic' in value:
                value = value.replace('Domestic', 'Iran')
                domestic_count += value.count('Iran') - original_value.count('Iran')
            
            translations[key] = value
        
        # Save updated English
        data['translations'] = translations
        self.save_json(en_file, data)
        
        print(f"✓ Updated message.en.json")
        print(f"  - Replaced 'Foreign' → 'Starlink': {foreign_count} occurrences")
        print(f"  - Replaced 'Domestic' → 'Iran': {domestic_count} occurrences")
        
        return translations
    
    def phase2_copy_to_locales(self, english_translations: Dict):
        """Phase 2: Copy English translations to all locale files."""
        print("\n" + "="*60)
        print("PHASE 2: Copying English to All Locale Files")
        print("="*60)
        
        for locale in ALL_LOCALES:
            locale_file = self.locales_dir / f'message.{locale}.json'
            
            if not locale_file.exists():
                print(f"⚠ Skipping {locale}: File not found")
                continue
            
            # Backup
            self.backup_file(locale_file)
            
            # Load current file to preserve locale field
            data = self.load_json(locale_file)
            
            # Replace translations with English
            data['translations'] = english_translations
            
            # Save
            self.save_json(locale_file, data)
            print(f"✓ Updated message.{locale}.json with English translations")
    
    def translate_text(self, text: str, target_lang: str, max_retries: int = 3) -> Optional[str]:
        """Translate text to target language with retry logic."""
        if not self.translator:
            return None
        
        for attempt in range(max_retries):
            try:
                result = self.translator.translate(text, dest=target_lang)
                return result.text
            except Exception as e:
                if attempt < max_retries - 1:
                    wait_time = (attempt + 1) * 2  # Exponential backoff
                    print(f"  ⚠ Translation failed, retrying in {wait_time}s... ({str(e)[:50]})")
                    time.sleep(wait_time)
                else:
                    print(f"  ✗ Translation failed after {max_retries} attempts: {str(e)[:100]}")
                    return None
        return None
    
    def phase3_translate_locale(self, locale: str, delay: float = 0.2):
        """Phase 3: Translate a specific locale file."""
        if not TRANSLATOR_AVAILABLE:
            print(f"✗ Cannot translate {locale}: googletrans not installed")
            return False
        
        locale_file = self.locales_dir / f'message.{locale}.json'
        
        if not locale_file.exists():
            print(f"✗ File not found: {locale_file}")
            return False
        
        # Get Google Translate language code
        target_lang = LOCALE_TO_GOOGLE_LANG.get(locale)
        if not target_lang:
            print(f"✗ Unknown locale: {locale}")
            return False
        
        print(f"\n{'─'*60}")
        print(f"Translating: {locale} ({target_lang})")
        print(f"{'─'*60}")
        
        # Load locale file (contains English at this point)
        data = self.load_json(locale_file)
        translations = data.get('translations', {})
        
        total = len(translations)
        translated = 0
        failed = 0
        
        # Translate each entry
        for key, english_text in translations.items():
            # Show progress
            if (translated + failed) % 50 == 0 or (translated + failed) == 0:
                print(f"  Progress: {translated + failed}/{total} entries processed...")
            
            # Translate
            translated_text = self.translate_text(english_text, target_lang)
            
            if translated_text:
                translations[key] = translated_text
                translated += 1
            else:
                failed += 1
                # Keep English text if translation fails
            
            # Rate limiting
            time.sleep(delay)
        
        # Save translated file
        data['translations'] = translations
        self.save_json(locale_file, data)
        
        print(f"\n✓ Completed: {locale}")
        print(f"  - Successfully translated: {translated}/{total}")
        if failed > 0:
            print(f"  - Failed (kept English): {failed}/{total}")
        
        return True


def main():
    parser = argparse.ArgumentParser(
        description='Update and translate NASNET Connect locale files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Update English and copy to all locales (no translation)
  python translate_and_update.py
  
  # Translate specific locales
  python translate_and_update.py --locales fa ar
  
  # Translate all locales
  python translate_and_update.py --all
  
  # Custom delay between API calls (default: 0.2s)
  python translate_and_update.py --all --delay 0.5
        """
    )
    
    parser.add_argument(
        '--locales',
        nargs='+',
        choices=ALL_LOCALES,
        help='Specific locales to translate (e.g., fa ar fr)'
    )
    
    parser.add_argument(
        '--all',
        action='store_true',
        help='Translate all locales'
    )
    
    parser.add_argument(
        '--delay',
        type=float,
        default=0.2,
        help='Delay between API calls in seconds (default: 0.2)'
    )
    
    parser.add_argument(
        '--skip-phase1',
        action='store_true',
        help='Skip Phase 1 (English replacement)'
    )
    
    parser.add_argument(
        '--skip-phase2',
        action='store_true',
        help='Skip Phase 2 (copying to locales)'
    )
    
    args = parser.parse_args()
    
    # Initialize updater
    updater = TranslationUpdater()
    
    # Phase 1: Update English
    if not args.skip_phase1:
        english_translations = updater.phase1_update_english()
    else:
        print("\nSkipping Phase 1 (English replacement)")
        en_file = updater.locales_dir / 'message.en.json'
        data = updater.load_json(en_file)
        english_translations = data.get('translations', {})
    
    # Phase 2: Copy to all locales
    if not args.skip_phase2:
        updater.phase2_copy_to_locales(english_translations)
    else:
        print("\nSkipping Phase 2 (copying to locales)")
    
    # Phase 3: Translate specific locales
    if args.all or args.locales:
        if not TRANSLATOR_AVAILABLE:
            print("\n" + "="*60)
            print("ERROR: Cannot proceed with translation")
            print("="*60)
            print("Please install googletrans:")
            print("  pip install googletrans==4.0.0-rc1")
            sys.exit(1)
        
        locales_to_translate = ALL_LOCALES if args.all else args.locales
        
        print("\n" + "="*60)
        print("PHASE 3: Translating Locale Files")
        print("="*60)
        print(f"Target locales: {', '.join(locales_to_translate)}")
        print(f"Delay between calls: {args.delay}s")
        
        success_count = 0
        for locale in locales_to_translate:
            if updater.phase3_translate_locale(locale, args.delay):
                success_count += 1
        
        print("\n" + "="*60)
        print("TRANSLATION SUMMARY")
        print("="*60)
        print(f"Successfully translated: {success_count}/{len(locales_to_translate)} locales")
    else:
        print("\n" + "="*60)
        print("PHASE 3: Skipped (no locales specified)")
        print("="*60)
        print("To translate locales, use:")
        print("  --locales fa ar  (specific locales)")
        print("  --all            (all locales)")
    
    print("\n✓ All operations completed!")


if __name__ == '__main__':
    main()


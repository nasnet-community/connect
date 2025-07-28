import { describe, it, expect, vi } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { $ } from "@builder.io/qwik";
import { Rating } from "./Rating";

describe("Rating Component", () => {
  it("should render with default props", async () => {
    const { screen, render } = await createDOM();

    await render(<Rating label="Test Rating" />);

    const label = screen.querySelector("label");
    expect(label?.textContent).toContain("Test Rating");

    const rating = screen.querySelector('[role="slider"]');
    expect(rating).toBeTruthy();
    expect(rating?.getAttribute("aria-valuemin")).toBe("0");
    expect(rating?.getAttribute("aria-valuemax")).toBe("5");
    expect(rating?.getAttribute("aria-valuenow")).toBe("0");
  });

  it("should render with custom max value", async () => {
    const { screen, render } = await createDOM();

    await render(<Rating max={10} />);

    const rating = screen.querySelector('[role="slider"]');
    expect(rating?.getAttribute("aria-valuemax")).toBe("10");

    const stars = screen.querySelectorAll("svg");
    expect(stars.length).toBe(10);
  });

  it("should handle value changes", async () => {
    const { screen, render, userEvent } = await createDOM();
    const onValueChange = vi.fn();

    await render(<Rating value={0} onValueChange$={$(onValueChange)} />);

    const stars = screen.querySelectorAll("div[class*='relative']");
    await userEvent(stars[2], "click");

    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it("should support half-star precision", async () => {
    const { screen, render } = await createDOM();

    await render(<Rating value={2.5} precision={0.5} />);

    const rating = screen.querySelector('[role="slider"]');
    expect(rating?.getAttribute("aria-valuenow")).toBe("2.5");
  });

  it("should be disabled when disabled prop is true", async () => {
    const { screen, render } = await createDOM();

    await render(<Rating disabled={true} />);

    const rating = screen.querySelector('[role="slider"]');
    expect(rating?.getAttribute("aria-disabled")).toBe("true");
    expect(rating?.getAttribute("tabIndex")).toBe("-1");
  });

  it("should be read-only when readOnly prop is true", async () => {
    const { screen, render, userEvent } = await createDOM();
    const onValueChange = vi.fn();

    await render(
      <Rating readOnly={true} value={3} onValueChange$={$(onValueChange)} />,
    );

    const rating = screen.querySelector('[role="slider"]');
    expect(rating?.getAttribute("aria-readonly")).toBe("true");
    expect(rating?.getAttribute("tabIndex")).toBe("-1");

    const stars = screen.querySelectorAll("div[class*='relative']");
    await userEvent(stars[0], "click");

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("should support custom labels", async () => {
    const { screen, render } = await createDOM();
    const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

    await render(<Rating value={3} labels={labels} />);

    const rating = screen.querySelector('[role="slider"]');
    expect(rating?.getAttribute("aria-valuetext")).toBe("Good");
  });

  it("should show error message", async () => {
    const { screen, render } = await createDOM();

    await render(<Rating error="Please select a rating" />);

    const errorMessage = screen.querySelector('[id$="-error"]');
    expect(errorMessage?.textContent).toBe("Please select a rating");
  });

  it("should show helper text", async () => {
    const { screen, render } = await createDOM();

    await render(<Rating helperText="Rate from 1 to 5 stars" />);

    const helperText = screen.querySelector('[id$="-helper"]');
    expect(helperText?.textContent).toBe("Rate from 1 to 5 stars");
  });

  it("should support allow clear functionality", async () => {
    const { screen, render, userEvent } = await createDOM();
    const onValueChange = vi.fn();

    await render(
      <Rating value={3} allowClear={true} onValueChange$={$(onValueChange)} />,
    );

    const stars = screen.querySelectorAll("div[class*='relative']");
    // Click on the 3rd star (which is already selected)
    await userEvent(stars[2], "click");

    expect(onValueChange).toHaveBeenCalledWith(0);
  });

  it("should show value when showValue is true", async () => {
    const { screen, render } = await createDOM();

    await render(
      <Rating value={3.5} precision={0.5} showValue={true} max={5} />,
    );

    const valueDisplay = screen.querySelector("span[class*='text-sm']");
    expect(valueDisplay?.textContent).toBe("3.5 / 5");
  });

  it("should support keyboard navigation", async () => {
    const { screen, render, userEvent } = await createDOM();
    const onValueChange = vi.fn();

    await render(<Rating value={3} onValueChange$={$(onValueChange)} />);

    const rating = screen.querySelector('[role="slider"]') as HTMLElement;

    // Test arrow right
    await userEvent(rating, "keydown", { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenCalledWith(4);

    // Test arrow left
    await userEvent(rating, "keydown", { key: "ArrowLeft" });
    expect(onValueChange).toHaveBeenCalledWith(2);

    // Test Home key
    await userEvent(rating, "keydown", { key: "Home" });
    expect(onValueChange).toHaveBeenCalledWith(0);

    // Test End key
    await userEvent(rating, "keydown", { key: "End" });
    expect(onValueChange).toHaveBeenCalledWith(5);

    // Test number key
    await userEvent(rating, "keydown", { key: "4" });
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it("should handle hover events", async () => {
    const { screen, render, userEvent } = await createDOM();
    const onHoverChange = vi.fn();

    await render(<Rating value={3} onHoverChange$={$(onHoverChange)} />);

    const stars = screen.querySelectorAll("div[class*='relative']");

    // Hover over 4th star
    await userEvent(stars[3], "mouseenter");
    expect(onHoverChange).toHaveBeenCalledWith(4);

    // Mouse leave
    const ratingContainer = screen.querySelector(
      '[role="slider"]',
    ) as HTMLElement;
    await userEvent(ratingContainer, "mouseleave");
    expect(onHoverChange).toHaveBeenCalledWith(null);
  });

  it("should render with different sizes", async () => {
    const { screen, render } = await createDOM();

    await render(
      <>
        <Rating size="sm" class="rating-sm" />
        <Rating size="md" class="rating-md" />
        <Rating size="lg" class="rating-lg" />
      </>,
    );

    const smRating = screen.querySelector(".rating-sm [role='slider']");
    const mdRating = screen.querySelector(".rating-md [role='slider']");
    const lgRating = screen.querySelector(".rating-lg [role='slider']");

    expect(smRating?.className).toContain("text-lg");
    expect(mdRating?.className).toContain("text-2xl");
    expect(lgRating?.className).toContain("text-3xl");
  });

  it("should include hidden input for form submission", async () => {
    const { screen, render } = await createDOM();

    await render(<Rating name="product-rating" value={4} />);

    const hiddenInput = screen.querySelector(
      'input[type="hidden"][name="product-rating"]',
    ) as HTMLInputElement;
    expect(hiddenInput).toBeTruthy();
    expect(hiddenInput.value).toBe("4");
  });

  it("should support required field", async () => {
    const { screen, render } = await createDOM();

    await render(<Rating label="Required Rating" required={true} />);

    const label = screen.querySelector("label");
    expect(label?.textContent).toContain("*"); // Required indicator
  });
});

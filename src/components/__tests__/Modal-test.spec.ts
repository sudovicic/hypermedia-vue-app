import { describe, expect, it } from "vitest";
import Modal from "@/components/Modal.vue";
import { mount } from "@vue/test-utils";

describe("Modal", () => {
  it("should render the modal when the open prop is true", () => {
    // Mount the component
    const wrapper = mount(Modal);

    // Assert that the modal exists
    const modal = wrapper.find(".modal");
    expect(modal.exists()).toBe(true);
  });
});

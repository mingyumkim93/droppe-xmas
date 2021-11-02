import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppBar from "./AppBar";

describe("AppBar", () => {
  it("should have link to main page", () => {
    render(
      <Router>
        <AppBar />
      </Router>
    );
    const aTag = document.querySelector("a");
    expect(aTag).toBeVisible();
    expect(aTag!.href).toEqual(window.location.origin + "/");
  });
});

import React from "react";

const NavSettings = () => {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Theme
      </p>

      <div className="flex items-center justify-between">
        <span>Select Theme</span>
        <span className="opacity-80">System</span>
      </div>
    </div>
  );
};

export default NavSettings;

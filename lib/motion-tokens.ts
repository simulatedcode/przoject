// IBM Carbon Design System - Motion Tokens
// https://carbondesignsystem.com/elements/motion/overview/

export const easings = {
    // -------------------------------------------------------------
    // PRODUCTIVE
    // Used for micro-interactions, layout changes, and simple state transitions.
    // Feels mechanical, snappy, and efficient.
    // -------------------------------------------------------------
    standard: {
        productive: "cubic-bezier(0.2, 0, 0.38, 0.9)", // Element moving from A to B
        expressive: "cubic-bezier(0.4, 0.14, 0.3, 1)", // Expressive A to B
    },
    entrance: {
        productive: "cubic-bezier(0, 0, 0.38, 0.9)", // Entering the screen (Deceleration)
        expressive: "cubic-bezier(0, 0, 0.3, 1)", // Expressive Entrance
    },
    exit: {
        productive: "cubic-bezier(0.2, 0, 1, 0.9)", // Exiting the screen (Acceleration)
        expressive: "cubic-bezier(0.4, 0.14, 1, 1)", // Expressive Exit
    },
};

export const durations = {
    fast01: 70, // Micro-interactions (hover, toggle, fade)
    fast02: 110, // Small expansions, short distances
    moderate01: 150, // Medium distances, secondary navigations
    moderate02: 240, // Large layout shifts, primary panel entrances
    slow01: 400, // Full screen transitions, dramatic entrances
    slow02: 700, // Background movements, system load states
};

export const gsapEasings = {
    standard: {
        productive: "CustomEase.create('standard', '0.2, 0, 0.38, 0.9')",
        expressive: "CustomEase.create('expressive', '0.4, 0.14, 0.3, 1')",
    },
    entrance: {
        productive: "CustomEase.create('entrance', '0, 0, 0.38, 0.9')",
        expressive: "CustomEase.create('entranceExp', '0, 0, 0.3, 1')",
    },
    exit: {
        productive: "CustomEase.create('exit', '0.2, 0, 1, 0.9')",
        expressive: "CustomEase.create('exitExp', '0.4, 0.14, 1, 1')",
    }
};

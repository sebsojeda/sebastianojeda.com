export default function FallbackStyles() {
  return (
    <style>{`
        html {
            --color-error-lighter: #f7d4d6;
            --color-error-light: #f33;
            --color-error: red;
            --color-error-dark: #e60000;
            --color-success-lighter: #d3e5ff;
            --color-success-light: #3291ff;
            --color-success: #0070f3;
            --color-success-dark: #0761d1;
            --color-warning-lighter: #ffefcf;
            --color-warning-light: #f7b955;
            --color-warning: #f5a623;
            --color-warning-dark: #ab570a;
            --color-violet-lighter: #e3d7fc;
            --color-violet-light: #8a63d2;
            --color-violet: #7928ca;
            --color-violet-dark: #4c2889;
            --color-cyan-lighter: #aaffec;
            --color-cyan-light: #79ffe1;
            --color-cyan: #50e3c2;
            --color-cyan-dark: #29bc9b;
            --color-highlight-purple: #f81ce5;
            --color-highlight-magenta: #eb367f;
            --color-highlight-pink: #ff0080;
            --color-highlight-yellow: #fff500;
            --color-background: #fff;
            --color-accent-1: #fafafa;
            --color-accent-2: #eaeaea;
            --color--accent-3: #999;
            --color-accent-4: #888;
            --color-accent-5: #666;
            --color--accent-6: #444;
            --color-accent-7: #333;
            --color-accent-8: #111;
            --color-foreground: #000;
            --color-highlight-background: var(--color-cyan),
            --color-highlight-foreground: #fff,
        }
    `}</style>
  );
}

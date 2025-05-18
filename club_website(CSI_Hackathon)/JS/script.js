// Check if the script is linked correctly
console.log("Sasta Csi Script loaded successfully!");

// --- Simple Form Handling (Client-Side Only) ---
// Prevent default form submission and show a message
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the page from reloading
        // In a real project, you'd send this data to a server here.
        // For this frontend-only demo, just show a confirmation.
        alert('Thank you for your message! (Note: Data is not actually sent)');
        // Optionally clear the form: event.target.reset();
    });
}

const joinForm = document.getElementById('join-form');
if (joinForm) {
    joinForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the page from reloading
        // In a real project, you'd send this data to a server here.
        // For this frontend-only demo, just show a confirmation.
        alert('Thank you for your application! (Note: Data is not actually sent)');
        // Optionally clear the form: event.target.reset();
    });
}


// --- Canvas Animation: Flowing Formulas ---
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d'); // Get the 2D rendering context

// Updated list with only mathematical and coding-related concepts/symbols
const formulas = [
    "a² + b² = c²", // Pythagorean Theorem
    "x = (-b ± √(b²-4ac)) / 2a", // Quadratic Formula
    "∫ f(x) dx", // Integral
    "∑ᵢ=₁ⁿ i", // Summation notation
    "Δy / Δx", // Slope/Rate of Change
    "lim(x→a) f(x)", // Limit
    "∂²f/∂x² + ∂²f/∂y²", // Partial Derivatives / Laplacian
    "sin²θ + cos²θ = 1", // Trigonometric identity
    "e^(iπ) + 1 = 0", // Euler's Identity
    "∇²f = 0", // Laplace's Equation
    "∂u/∂t = α∇²u", // Heat Equation
    "i = √(-1)", // Imaginary Unit
    "Hψ = Eψ", // Quantum Mechanics / Computational Physics (Symbolic)
    "void setup() {", // Processing/p5.js start
    "loop() { ... }", // Programming loop concept
    "// comment", // Code comment syntax
    "print('Hello')", // Simple print statement
    "function() {}", // Function definition syntax
    "while (true)", // While loop
    "if (x > 0)", // Conditional statement
    "array[i]", // Array access
    "class MyClass {}", // Class definition
    ".property = value", // Object property access
    "->pointer", // Pointer dereference
    "&reference" // Reference
];

const flowingFormulas = [];
const numberOfFormulas = 50; // Density - kept same
const minSpeed = 0.2; // Speed - kept same
const maxSpeed = 0.8; // Speed - kept same
const maxDrift = 0.3; // Drift - kept same - Note: dx/dy calculated differently now

// Function to initialize a formula object
function createFormula() {
    const formulaText = formulas[Math.floor(Math.random() * formulas.length)];
    const fontSize = Math.random() * 18 + 12; // Font size range (12 to 30) - kept same
    // Note: Speed and drift are now derived, not directly used to update position
    const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    const angle = Math.random() * Math.PI * 2; // Random angle for direction

    return {
        text: formulaText,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height, // Start anywhere on the canvas initially
        // Calculate dx and dy based on speed and angle for consistent movement magnitude
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        size: fontSize,
        opacity: Math.random() * 0.5 + 0.3 // Random opacity between 0.3 and 0.8 - kept same
    };
}

// Populate the flowing formulas array
function initFlowingFormulas() {
    flowingFormulas.length = 0; // Clear existing
    for (let i = 0; i < numberOfFormulas; i++) {
        flowingFormulas.push(createFormula());
    }
}

// Animation loop for the canvas
function animateFormulas() {
    requestAnimationFrame(animateFormulas); // Loop the animation

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update each formula
    flowingFormulas.forEach(formula => {
        // Update position based on drift
        formula.x += formula.dx;
        formula.y += formula.dy;

        // Wrap around edges
        // Measure text width for accurate horizontal wrapping
        const textWidth = ctx.measureText(formula.text).width;

        if (formula.x > canvas.width) {
            formula.x = -textWidth; // Wrap to left, considering text width
        } else if (formula.x < -textWidth) {
            formula.x = canvas.width; // Wrap to right
        }

        if (formula.y > canvas.height + formula.size) { // Check if bottom of text is below canvas
             formula.y = -formula.size; // Wrap to top
        } else if (formula.y < -formula.size) { // Check if top of text is above canvas
             formula.y = canvas.height + formula.size; // Wrap to bottom
        }


        // Draw the text
        ctx.font = `${formula.size}px 'Roboto Mono', monospace`;
        ctx.fillStyle = `rgba(0, 255, 255, ${formula.opacity})`; // Neon blue with varying opacity
        ctx.fillText(formula.text, formula.x, formula.y);
    });
}

// Handle window resizing for the canvas
function resizeCanvas() {
    if (canvas && ctx) {
        // Set canvas dimensions to match the window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Re-initialize formulas based on new size
        initFlowingFormulas();
    }
}


// Initialize the canvas animation when the window loads
window.addEventListener('load', () => {
    resizeCanvas(); // Set initial size
    initFlowingFormulas(); // Initialize formula positions
    animateFormulas(); // Start animation
});
// Add event listener for window resize
window.addEventListener('resize', resizeCanvas);

// Initialize AOS (keep this as it's for the general page animations)
AOS.init({
    duration: 1000,
    once: true
});

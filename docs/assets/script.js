
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById("contact-form");
    const contactSuccess = document.getElementById("contact-success");
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const label = btn.querySelector(".btn-label");
        btn.disabled = true;
        label.textContent = "Sending...";
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: new FormData(contactForm),
            });
            const result = await res.json();
            if (result.success) {
                contactForm.style.display = "none";
                contactSuccess.style.display = "block";
            } else {
                btn.disabled = false;
                label.textContent = "Send message";
                alert("Something went wrong — please try again.");
            }
        } catch (err) {
            btn.disabled = false;
            label.textContent = "Send message";
            alert("Network error — please try again.");
        }
    });

    const dots = document.querySelectorAll('.page-dots .dot');
    const sections = document.querySelectorAll('.snap-section');
    const container = document.querySelector('.scroll-container');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            sections[+dot.dataset.index].scrollIntoView({ behavior: 'smooth' });
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const i = [...sections].indexOf(entry.target);
                dots.forEach(d => d.classList.remove('active'));
                if (dots[i]) dots[i].classList.add('active');
            }
        });
    }, { root: container, threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
});
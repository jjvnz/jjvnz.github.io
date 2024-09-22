import gsap from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
import { ScrollTrigger } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"; // Cambia la versión a la misma que gsap

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".section").forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom top",
                    scrub: true,
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    document.querySelector('.button').addEventListener('click', () => {
        gsap.to(window, { duration: 1, scrollTo: "#work-showcase" });
    });
});
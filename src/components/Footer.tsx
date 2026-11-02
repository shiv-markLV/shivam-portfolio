export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>© {new Date().getFullYear()} Shivam Yadav. All rights reserved.</span>
        <span className="font-display">Built with Next.js, Three.js & GSAP.</span>
      </div>
    </footer>
  );
}





function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto items">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
        
            <span>

            <div  className="flex items-center gap-2 text-gray-400 items-center">
              
          
            <a 
              href="https://pabitra-sahoo.github.io/Code-Connect-Team/"
              target="_self"
              rel="noopener noreferrer"
              
            >
                Made with <span>♥</span> by Team Seven • © {new Date().getFullYear()}
            </a> 
          
          </div>

            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
export default Footer;
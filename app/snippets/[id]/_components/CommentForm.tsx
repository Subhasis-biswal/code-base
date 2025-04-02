import { CodeIcon, SendIcon, InfoIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import CommentContent from "./CommentContent";

interface CommentFormProps {
  onSubmit: (comment: string) => Promise<void>;
  isSubmitting: boolean;
}

function CommentForm({ isSubmitting, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showTooltip && infoButtonRef.current) {
      const rect = infoButtonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - 10,
        left: rect.left
      });
    }
  }, [showTooltip]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTooltip(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newComment = comment.substring(0, start) + "  " + comment.substring(end);
      setComment(newComment);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    await onSubmit(comment);

    setComment("");
    setIsPreview(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-[#0a0a0f] rounded-xl border border-[#ffffff0a] overflow-hidden">
        {/* Comment form header */}
        <div className="flex justify-between items-center px-4 pt-2">
          <div className="relative">
            <button
              ref={infoButtonRef}
              type="button"
              className="text-[#808086] hover:text-[#e1e1e3] transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <InfoIcon className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`text-sm px-3 py-1 rounded-md transition-colors ${
              isPreview ? "bg-blue-500/10 text-blue-400" : "hover:bg-[#ffffff08] text-gray-400"
            }`}
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {/* Comment form body */}
        {isPreview ? (
          <div className="min-h-[120px] p-4 text-[#e1e1e3">
            <CommentContent content={comment} />
          </div>
        ) : (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add to the discussion..."
            className="w-full bg-transparent border-0 text-[#e1e1e3] placeholder:text-[#808086] outline-none 
            resize-none min-h-[120px] p-4 font-mono text-sm"
          />
        )}

        {/* Comment Form Footer */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-[#080809] border-t border-[#ffffff0a]">
          <div className="hidden sm:block text-xs text-[#808086] space-y-1">
            <div className="flex items-center gap-2">
              <CodeIcon className="w-3.5 h-3.5" />
              <span>Format code with ```&lt;language&gt; //nextline &lt;code&gt; //nextline ``` </span>
            </div>

            <div className="flex items-center gap-2">
              
              <span>e.g: ```javascript //nextline &lt;code&gt; //nextline ``` </span>
            </div>


            <div className="text-[#808086]/60 pl-5">
              Tab key inserts spaces • Preview your comment before posting
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
          >
            {isSubmitting ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-white/30 
                border-t-white rounded-full animate-spin"
                />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <SendIcon className="w-4 h-4" />
                <span>Comment</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tooltip outside the overflow container */}
      <div 
        className={`fixed w-[300px] bg-[#1a1a1f] text-[#e1e1e3] px-4 py-3 rounded-lg text-sm border border-[#ffffff0a] shadow-lg z-[9999] transition-all duration-200 ease-out ${
          showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          transform: showTooltip ? 'translateY(-100%)' : 'translateY(-90%)'
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center gap-2 mb-2">
          <InfoIcon className="w-4 h-4 text-[#3b82f6]" />
          <p className="font-medium">How to comment:</p>
        </div>
        <ul className="space-y-2 text-[#808086]">
          <li className="flex items-start gap-2">
            <span className="text-[#3b82f6]">•</span>
            <span>Use Tab key to insert spaces</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3b82f6]">•</span>
            <span>Format code with: <br /> ```&lt;language&gt;  <br />    &lt;code&gt;<br />  ``` </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3b82f6]">•</span>
          
            <span>e.g: ```javascript  <br />    &lt;code&gt;<br />  ``` </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3b82f6]">•</span>
            <span>Preview your comment before posting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3b82f6]">•</span>
            <span>Be respectful and constructive</span>
          </li>
        </ul>
        <div 
          className={`absolute left-4 bottom-0 translate-y-1/2 rotate-45 w-2 h-2 bg-[#1a1a1f] border-r border-b border-[#ffffff0a] transition-all duration-200 ${
            showTooltip ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        />
      </div>
    </form>
  );
}
export default CommentForm;
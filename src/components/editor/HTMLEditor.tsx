import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HTMLEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function HTMLEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  className,
}: HTMLEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!content);

  useEffect(() => {
    if (editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      if (currentHtml !== content) {
        editorRef.current.innerHTML = content || "";
        setIsEmpty(!content || content.trim() === "" || content === "<br>" || content === "<p></p>");
      }
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const isEmptyContent = !html || html.trim() === "" || html === "<br>" || html === "<p></p>";
      setIsEmpty(isEmptyContent);
      onChange(html);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-2 bg-muted/50">
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("bold", false);
          }}
          className="px-2 py-1 rounded hover:bg-accent text-sm font-bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("italic", false);
          }}
          className="px-2 py-1 rounded hover:bg-accent text-sm italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("underline", false);
          }}
          className="px-2 py-1 rounded hover:bg-accent text-sm underline"
        >
          U
        </button>
        <div className="border-l mx-1" />
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("formatBlock", false, "h1");
          }}
          className="px-2 py-1 rounded hover:bg-accent text-xs"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("formatBlock", false, "h2");
          }}
          className="px-2 py-1 rounded hover:bg-accent text-xs"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("formatBlock", false, "h3");
          }}
          className="px-2 py-1 rounded hover:bg-accent text-xs"
        >
          H3
        </button>
        <div className="border-l mx-1" />
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("insertUnorderedList", false);
          }}
          className="px-2 py-1 rounded hover:bg-accent text-sm"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("insertOrderedList", false);
          }}
          className="px-2 py-1 rounded hover:bg-accent text-sm"
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("formatBlock", false, "blockquote");
          }}
          className="px-2 py-1 rounded hover:bg-accent text-sm"
        >
          &quot;
        </button>
        <div className="border-l mx-1" />
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            const url = prompt("URL:");
            if (url) document.execCommand("createLink", false, url);
          }}
          className="px-2 py-1 rounded hover:bg-accent text-xs"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("undo", false);
          }}
          className="px-2 py-1 rounded hover:bg-accent text-sm"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => {
            editorRef.current?.focus();
            document.execCommand("redo", false);
          }}
          className="px-2 py-1 rounded hover:bg-accent text-sm"
        >
          ↷
        </button>
      </div>
      {/* Editor Content */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onPaste={handlePaste}
          onFocus={() => {
            if (isEmpty) setIsEmpty(false);
          }}
          className={cn(
            "prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none min-h-[200px] p-4 focus:outline-none",
            className
          )}
          suppressContentEditableWarning
        />
        {isEmpty && (
          <div
            className="absolute pointer-events-none text-muted-foreground p-4 top-0 left-0"
            style={{ zIndex: 0 }}
          >
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}


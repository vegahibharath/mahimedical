import React, { useState, useRef, useEffect } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import './ImageComponent.css'

const ImageComponent = (props) => {
    const { node, updateAttributes, selected, editor } = props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startDims, setStartDims] = useState({ w: 0, h: 0 });
    const [startCoords, setStartCoords] = useState({ top: 0, left: 0 });
    const [resizeDir, setResizeDir] = useState(null);
    const containerRef = useRef(null);

    const isEditable = editor.isEditable;

    const toggleMenu = (e) => {
        if (!isEditable) return;
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };

    const setLayout = (layout) => {
        updateAttributes({ layout, position: 'relative', zIndex: 0, top: null, left: null });
        setMenuOpen(false);
    };

    const setPosition = (pos, z) => {
        // When switching to absolute, initialize top/left if not set
        const currentRect = containerRef.current?.getBoundingClientRect();
        // This is a simplification; for real absolute positioning relative to a container, 
        // we'd need more complex calculation. For now, we start at 0,0 relative to parent or Keep current visual position?
        // Let's set default Top/Left to current offsets or just 0,0 to start.
        updateAttributes({
            layout: 'none',
            position: pos,
            zIndex: z,
            top: node.attrs.top || 0,
            left: node.attrs.left || 0
        });
        setMenuOpen(false);
    }

    // --- Resizing Logic ---
    const handleResizeStart = (direction, e) => {
        if (!isEditable) return;
        e.preventDefault();
        e.stopPropagation();
        setResizing(true);
        setResizeDir(direction);
        setStartPos({ x: e.clientX, y: e.clientY });

        const rect = containerRef.current.getBoundingClientRect();
        setStartDims({ w: rect.width, h: rect.height });
    };

    // --- Dragging Logic ---
    const handleDragStart = (e) => {
        if (!isEditable || node.attrs.position !== 'absolute') return;
        e.preventDefault(); // Prevent default drag
        setDragging(true);
        setStartPos({ x: e.clientX, y: e.clientY });
        setStartCoords({
            top: parseInt(node.attrs.top) || 0,
            left: parseInt(node.attrs.left) || 0
        });
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (resizing) {
                const dx = e.clientX - startPos.x;
                const dy = e.clientY - startPos.y;

                let newWidth = startDims.w;
                let newHeight = startDims.h;

                if (resizeDir.includes('e')) newWidth += dx;
                if (resizeDir.includes('w')) newWidth -= dx;
                if (resizeDir.includes('s')) newHeight += dy;
                if (resizeDir.includes('n')) newHeight -= dy;

                // Enforce minimums
                if (newWidth < 50) newWidth = 50;
                if (newHeight < 50) newHeight = 50;

                updateAttributes({ width: newWidth, height: newHeight });
            }

            if (dragging) {
                const dx = e.clientX - startPos.x;
                const dy = e.clientY - startPos.y;

                updateAttributes({
                    top: startCoords.top + dy,
                    left: startCoords.left + dx
                });
            }
        };

        const handleMouseUp = () => {
            if (resizing) setResizing(false);
            if (dragging) setDragging(false);
        };

        if (resizing || dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizing, dragging, startPos, startDims, startCoords, resizeDir, updateAttributes]);


    // Styles based on attributes
    let style = {
        width: node.attrs.width,
        height: node.attrs.height,
        transition: (resizing || dragging) ? 'none' : 'all 0.2s ease',
        cursor: (node.attrs.position === 'absolute' && isEditable) ? 'move' : 'default'
    };

    let wrapperStyle = {
        display: 'inline-block',
        position: 'relative',
        lineHeight: 0,
        margin: '0 10px 10px 0',
    };

    if (node.attrs.layout === 'wrap-left') {
        wrapperStyle.float = 'left';
        wrapperStyle.marginRight = '1rem';
        wrapperStyle.marginBottom = '0.5rem';
    } else if (node.attrs.layout === 'wrap-right') {
        wrapperStyle.float = 'right';
        wrapperStyle.marginLeft = '1rem';
        wrapperStyle.marginBottom = '0.5rem';
    } else if (node.attrs.layout === 'center') {
        wrapperStyle.display = 'block';
        wrapperStyle.margin = '0 auto';
        wrapperStyle.textAlign = 'center';
    } else if (node.attrs.layout === 'full-width') {
        wrapperStyle.display = 'block';
        wrapperStyle.width = '100%';
    }

    // Absolute positioning (Behind/Front)
    if (node.attrs.position === 'absolute') {
        wrapperStyle.position = 'absolute';
        wrapperStyle.zIndex = node.attrs.zIndex;
        // Use the manual top/left if available, otherwise fallback/init
        wrapperStyle.left = `${node.attrs.left || 0}px`;
        wrapperStyle.top = `${node.attrs.top || 0}px`;
        // Remove the centering transform if we are manually positioning
        wrapperStyle.transform = 'none';
    }

    return (
        <NodeViewWrapper style={wrapperStyle} className="image-component-wrapper">
            <div
                ref={containerRef}
                className={`image-container ${selected ? 'ProseMirror-selectednode' : ''}`}
                style={{ position: 'relative', display: 'inline-block' }}
                onMouseDown={handleDragStart}
            >
                <img
                    src={node.attrs.src}
                    alt={node.attrs.alt}
                    style={style}
                    onClick={toggleMenu}
                    draggable={false} // Prevent browser native drag
                />

                {/* Resize Handles (Only when selected and editable) */}
                {selected && isEditable && (
                    <>
                        <div className="resize-handle nw" onMouseDown={(e) => handleResizeStart('nw', e)} />
                        <div className="resize-handle ne" onMouseDown={(e) => handleResizeStart('ne', e)} />
                        <div className="resize-handle sw" onMouseDown={(e) => handleResizeStart('sw', e)} />
                        <div className="resize-handle se" onMouseDown={(e) => handleResizeStart('se', e)} />
                    </>
                )}

                {/* Context Menu */}
                {menuOpen && isEditable && (
                    <div className="image-menu">
                    
                        <button onClick={() => setLayout('wrap-left')}>Wrap Left</button>
                        <button onClick={() => setLayout('wrap-right')}>Wrap Right</button>
                   
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    )
}

export default ImageComponent;

function checkBookmarkStatus() {
    const isLocal = window.location.protocol === 'file:';
    if(isLocal) return;
    try {
        const isBookmarked = window.external.IsFavorite(window.location.href);
        if (!isBookmarked) {
            setTimeout(() => {
                const confirmRes = confirm('🔖 检测到您尚未收藏本站，是否立即收藏？\n收藏后可快速访问，体验更佳！');
                if (confirmRes) {
                    if (window.sidebar) {
                        window.sidebar.addPanel(document.title, window.location.href, "");
                    } else if(window.external) {
                        window.external.AddFavorite(window.location.href, document.title);
                    } else if(window.opera && window.print) {
                        this.title=document.title;
                        return true;
                    } else {
                        alert('✅ 请按下快捷键 Ctrl+D 快速收藏本页面！');
                    }
                }
            }, 1500);
        }
    } catch (err) {
        setTimeout(() => {
            alert('💡 建议收藏本页面，方便下次快速访问！\n快捷键：Ctrl+D');
        }, 1500);
    }
}
checkBookmarkStatus();
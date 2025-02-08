class PageScroller {
    constructor() {
        this.container = document.querySelector('.container');
        this.pages = document.querySelectorAll('.page');
        this.currentPage = 0;
        this.totalPages = this.pages.length;
        this.touchStartY = 0;
        
        this.init();
    }

    init() {
        // 绑定事件监听
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        this.container.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.container.addEventListener('touchmove', this.handleTouchMove.bind(this));
    }

    scrollToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < this.totalPages) {
            this.pages[pageIndex].scrollIntoView({ behavior: 'smooth' });
            this.currentPage = pageIndex;
        }
    }

    handleKeydown(e) {
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                if (this.currentPage < this.totalPages - 1) {
                    this.scrollToPage(this.currentPage + 1);
                }
                break;
            case 'ArrowUp':
            case 'PageUp':
                if (this.currentPage > 0) {
                    this.scrollToPage(this.currentPage - 1);
                }
                break;
        }
    }

    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        const touchEndY = e.touches[0].clientY;
        const diff = this.touchStartY - touchEndY;

        if (Math.abs(diff) > 50) { // 最小滑动距离
            if (diff > 0 && this.currentPage < this.totalPages - 1) {
                // 向上滑动
                this.scrollToPage(this.currentPage + 1);
            } else if (diff < 0 && this.currentPage > 0) {
                // 向下滑动
                this.scrollToPage(this.currentPage - 1);
            }
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new PageScroller();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
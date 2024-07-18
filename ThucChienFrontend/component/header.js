class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /*html*/`
        <header class="header-style-six">
        <div id="header-fixed-height"></div>
        <div class="header-top-wrap-four">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <div class="header-top-left-four">
                            <div class="trending-box">
                                <div class="icon"><img src="assets/img/icon/trending_icon.svg" alt=""></div>
                                <span>Trending</span>
                                <div class="shape">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 36" preserveAspectRatio="none" fill="none">
                                        <path d="M0 18C0 8.05888 8.05887 0 18 0H110L121.26 16.8906C121.708 17.5624 121.708 18.4376 121.26 19.1094L110 36H18C8.05888 36 0 27.9411 0 18Z" fill="url(#trending_shape)" />
                                        <defs>
                                            <linearGradient id="trending_shape" x1="12" y1="36" x2="132" y2="36" gradientUnits="userSpaceOnUse">
                                                <stop offset="0" stop-color="#3F6088" />
                                                <stop offset="1" stop-color="#2A4970" stop-opacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div class="swiper-container ta-trending-slider">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <div class="trending-content">
                                            <a href="blog-details.html">Here area brands and designers to look out for next year 2023</a>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="trending-content">
                                            <a href="blog-details.html">Here area brands and designers to look out for next year 2023</a>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="trending-content">
                                            <a href="blog-details.html">Here area brands and designers to look out for next year 2023</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="header-top-social header-top-social-two">
                            <h5 class="title">Follow Us:</h5>
                            <ul class="list-wrap">
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-logo-area-four">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4">
                        <div class="hl-left-side-four">
                            <span class="date"><i class="flaticon-calendar"></i>February 12, 2024</span>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="logo text-center">
                            <a href="index.html"><img src="assets/img/logo/logo.png" alt=""></a>
                        </div>
                        <div class="logo d-none text-center">
                            <a href="index.html"><img src="assets/img/logo/w_logo.png" alt=""></a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="hl-right-side-four">
                            <div class="sign-in">
                                <a href="contact.html"><i class="flaticon-user"></i>Sign In</a>
                            </div>
                            <div class="subscribe-btn">
                                <a href="contact.html" class="btn btn-two">Subscribe</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="sticky-header" class="menu-area menu-style-six">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="menu-wrap">
                            <nav class="menu-nav">
                                <div class="logo d-none">
                                    <a href="index.html"><img src="assets/img/logo/logo.png" alt=""></a>
                                </div>
                                <div class="logo d-none white-logo">
                                    <a href="index.html"><img src="assets/img/logo/w_logo.png" alt=""></a>
                                </div>
                                <div class="offcanvas-toggle">
                                    <a href="javascript:void(0)" class="menu-tigger">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </a>
                                </div>
                                <div class="navbar-wrap main-menu d-none d-lg-flex">
                                    <ul class="navigation">
                                        <li class="active menu-item-has-children"><a href="#">Home</a>
                                            <ul class="sub-menu">
                                                <li><a href="index.html">Home 01 - Default</a></li>
                                                <li><a href="index-2.html">Home 02 - Gaming</a></li>
                                                <li><a href="index-3.html">Home 03 - Technology</a></li>
                                                <li><a href="index-4.html">Home 04 - Travel</a></li>
                                                <li><a href="index-5.html">Home 05 - Crypto</a></li>
                                                <li class="active"><a href="index-6.html">Home 06 - Newspaper</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="about.html">About Us</a></li>
                                        <li class="menu-item-has-children"><a href="#">Features</a>
                                            <ul class="sub-menu">
                                                <li class="menu-item-has-children"><a href="#">Single Post Layout</a>
                                                    <ul class="sub-menu">
                                                        <li><a href="blog-details.html">Single post 01</a></li>
                                                        <li><a href="blog-details-two.html">Single post 02</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="author.html">Author Details</a></li>
                                            </ul>
                                        </li>
                                        <li class="menu-item-has-children"><a href="#">Categories</a>
                                            <ul class="sub-menu" id="mainMenu">
                                                <li><a href="blog.html">Blog Default</a></li>
                                                <li><a href="blog-2.html">Blog Layout 02</a></li>
                                                <li><a href="blog-3.html">Blog Layout 03</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="contact.html">Contact</a></li>
                                        <li class="menu-item-has-children" id="account">
                                        </li>
                                    </ul>
                                </div>
                                <div class="header-search-wrap header-search-wrap-three">
                                    <form action="#" id = "formSearch">
                                        <input type="text" id="inputSearch" placeholder="Search here . . .">
                                        <button type="submit"><i class="flaticon-search"></i></button>
                                    </form>
                                </div>
                                <div class="mobile-nav-toggler"><i class="fas fa-bars"></i></div>
                            </nav>
                        </div>

                        <!-- Mobile Menu  -->
                        <div class="mobile-menu">
                            <nav class="menu-box">
                                <div class="close-btn"><i class="fas fa-times"></i></div>
                                <div class="nav-logo">
                                    <a href="index.html"><img src="assets/img/logo/logo.png" alt="Logo"></a>
                                </div>
                                <div class="nav-logo d-none">
                                    <a href="index.html"><img src="assets/img/logo/w_logo.png" alt="Logo"></a>
                                </div>
                                <div class="mobile-search">
                                    <form action="#">
                                        <input type="text" placeholder="Search here...">
                                        <button><i class="flaticon-search"></i></button>
                                    </form>
                                </div>
                                <div class="menu-outer">
                                    <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header-->
                                </div>
                                <div class="social-links">
                                    <ul class="clearfix list-wrap">
                                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div class="menu-backdrop"></div>
                        <!-- End Mobile Menu -->

                    </div>
                </div>
            </div>
        </div>

        <!-- offCanvas-area -->
        <div class="offCanvas-wrap">
            <div class="offCanvas-body">
                <div class="offCanvas-toggle">
                    <span></span>
                    <span></span>
                </div>
                <div class="offCanvas-content">
                    <div class="offCanvas-logo logo">
                        <a href="index.html" class="logo-dark"><img src="assets/img/logo/logo.png" alt="Logo"></a>
                        <a href="index.html" class="logo-light"><img src="assets/img/logo/w_logo.png" alt="Logo"></a>
                    </div>
                    <p>The argument in favor of using filler text goes something like this: If you use any real content in the Consulting Process anytime you reach.</p>
                    <ul class="offCanvas-instagram list-wrap">
                        <li><a href="assets/img/blog/hr_post01.jpg" class="popup-image"><img src="assets/img/blog/hr_post01.jpg" alt="img"></a></li>
                        <li><a href="assets/img/blog/hr_post02.jpg" class="popup-image"><img src="assets/img/blog/hr_post02.jpg" alt="img"></a></li>
                        <li><a href="assets/img/blog/hr_post03.jpg" class="popup-image"><img src="assets/img/blog/hr_post03.jpg" alt="img"></a></li>
                        <li><a href="assets/img/blog/hr_post04.jpg" class="popup-image"><img src="assets/img/blog/hr_post04.jpg" alt="img"></a></li>
                        <li><a href="assets/img/blog/hr_post05.jpg" class="popup-image"><img src="assets/img/blog/hr_post05.jpg" alt="img"></a></li>
                        <li><a href="assets/img/blog/hr_post06.jpg" class="popup-image"><img src="assets/img/blog/hr_post06.jpg" alt="img"></a></li>
                    </ul>
                </div>
                <div class="offCanvas-contact">
                    <h4 class="title">Get In Touch</h4>
                    <ul class="offCanvas-contact-list list-wrap">
                        <li><i class="fas fa-envelope-open"></i><a href="mailto:info@webmail.com">info@webmail.com</a></li>
                        <li><i class="fas fa-phone"></i><a href="tel:88899988877">888 999 888 77</a></li>
                        <li><i class="fas fa-map-marker-alt"></i> 12/A, New Booston, NYC</li>
                    </ul>
                    <ul class="offCanvas-social list-wrap">
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                        <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="offCanvas-overlay"></div>
        <!-- offCanvas-area-end -->
    </header>`

    }
}

customElements.define('x-header', Header);
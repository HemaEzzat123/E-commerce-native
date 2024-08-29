let footter = `
<div  id="user-category-footer" class="user-category-footer">
<footer class="footer">
    <div class="footer-content">
            <div class="user-footer-container">
            <div class="footer-text">
                <h3>Let Us Help You </h3>
                <p>Reach out to us through any of these support channels</p>
            </div>
            <div class="footer-support">
                <div class="support-item">
                    <span>PHONE SUPPORT</span>
                    <div>
                        <i class="fas fa-phone"></i> 16358
                    </div>
                </div>
                <div class="support-item">
                    <span>EMAIL SUPPORT </span>
                    <div>
                        <i class="fas fa-envelope"></i> egypt@shopease.com
                    </div>
                </div>
                <div class="support-item">
                    <span>CUSTOMER HAPPINESS CENTER </span>
                    <div>
                        <i class="fas fa-info-circle"></i> help.Shopease.com
                    </div>
                </div>
            </div>
        </div>
    </div> 
        <div class="footer-bottom-container">

            <div class="footer-copyright">
                <p>© 2024 noon. All Rights Reserved</p>
            </div>
            <div class="footer-payment">
                <img src="/IMAGES/cashIcon64.png" alt="Cash">
                <img src="/IMAGES/amexicon.png" alt="AMEX">
                <img src="/IMAGES/MASERicon.png" alt="MAstercard">
                <img src="/IMAGES/Visaicon.png" alt="Visa">
               
            </div>
          

            <div class="footer-links">
                <a href="#">Careers</a>
                <a href="#">Warranty Policy</a>
                <a href="#">Sell with us</a>
                <a href="#">Terms of Use</a>
                <a href="#">Terms of Sale</a>
                <a href="#">Privacy Policy</a>
            </div>
   
        </div>
   

</footer>

</div>

`;
document.querySelector(".footer").innerHTML = footter;

const top = document.querySelector(".toTop");
window.onscroll = function () {
  if (window.scrollY > 1000) {
    top.style.display = "block";
  } else {
    top.style.display = "none";
  }
};

top.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

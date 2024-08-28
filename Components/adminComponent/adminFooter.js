let footter=`
<div  id="user-category-footer" class="user-category-footer">
<footer class="footer">
    <div class="footer-content">
            <div class="user-footer-container">
            <div class="footer-text">
                <h3>نحن دائماً جاهزون لمساعدتك</h3>
                <p>تواصل معنا من خلال أي من قنوات الدعم التالية:</p>
            </div>
            <div class="footer-support">
                <div class="support-item">
                    <span>الدعم عبر الهاتف</span>
                    <div>
                        <i class="fas fa-phone"></i> 16358
                    </div>
                </div>
                <div class="support-item">
                    <span>الدعم عبر البريد الإلكتروني</span>
                    <div>
                        <i class="fas fa-envelope"></i> egypt@noon.com
                    </div>
                </div>
                <div class="support-item">
                    <span>مركز اسعاد المستهلكين</span>
                    <div>
                        <i class="fas fa-info-circle"></i> help.noon.com
                    </div>
                </div>
            </div>
        </div>
    </div> 
        <div class="footer-bottom-container">

            <div class="footer-copyright">
                <p> 2024 جميع الحقوق محفوظة </p>
            </div>
            <div class="footer-payment">
                <img src="cash-icon.png" alt="Cash">
                <img src="amex-icon.png" alt="Amex">
                <img src="valu-icon.png" alt="Valu">
                <img src="visa-icon.png" alt="Visa">
                <img src="mastercard-icon.png" alt="Mastercard">
            </div>
          

            <div class="footer-links">
                <a href="#">فرص التوظيف</a>
                <a href="#">سياسة الضمان</a>
                <a href="#">شروط البيع معنا</a>
                <a href="#">شروط الاستخدام</a>
                <a href="#">سياسة البيع</a>
                <a href="#">سياسة الخصوصية</a>
            </div>
   
        </div>
   

</footer>

</div>

`
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


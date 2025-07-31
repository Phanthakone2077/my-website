// api.js - ไฟล์เชื่อมต่อ Frontend กับ Backend

const API_URL = 'http://localhost:3000/api';

// ฟังก์ชันดึงข้อมูลเมนูจาก API
async function loadMenuFromAPI(category = 'all') {
  try {
    console.log(`Loading menu for category: ${category}`);
    
    const response = await fetch(`${API_URL}/menu?category=${category}`);
    const data = await response.json();
    
    if (data.success) {
      console.log('Menu loaded successfully:', data.data);
      displayMenuItems(data.data);
    } else {
      console.error('Failed to load menu:', data.message);
      showError('ไม่สามารถโหลดเมนูได้');
    }
  } catch (error) {
    console.error('Network error:', error);
    showError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
  }
}

// ฟังก์ชันแสดงเมนูในหน้าเว็บ
function displayMenuItems(items) {
  const menuGrid = document.querySelector('.menu-grid');
  
  if (!menuGrid) {
    console.error('Menu grid not found');
    return;
  }
  
  // ล้างเมนูเดิม
  menuGrid.innerHTML = '';
  
  // สร้าง HTML สำหรับแต่ละเมนู
  items.forEach(item => {
    const menuItemHTML = `
      <div class="menu-item" data-category="${item.category}">
        <div class="menu-image">
          <div class="item-placeholder ${item.category}-bg">
            <i class="${item.icon}"></i>
          </div>
        </div>
        <div class="menu-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="price">${item.price}</span>
        </div>
      </div>
    `;
    menuGrid.innerHTML += menuItemHTML;
  });
  
  console.log(`Displayed ${items.length} menu items`);
}

// ฟังก์ชันส่งข้อความติดต่อ
async function submitContactForm(formData) {
  try {
    console.log('Sending contact message:', formData);
    
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      showSuccess(result.message);
      return true;
    } else {
      showError(result.message);
      return false;
    }
  } catch (error) {
    console.error('Error sending message:', error);
    showError('ไม่สามารถส่งข้อความได้ กรุณาลองอีกครั้ง');
    return false;
  }
}

// ฟังก์ชันแสดงข้อความสำเร็จ
function showSuccess(message) {
  alert('✅ ' + message);
}

// ฟังก์ชันแสดงข้อความผิดพลาด
function showError(message) {
  alert('❌ ' + message);
}

// ฟังก์ชันตรวจสอบสถานะ API
async function checkAPIHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ API is working:', data.message);
      return true;
    } else {
      console.log('❌ API error:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Cannot connect to API:', error.message);
    return false;
  }
}

// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', async function() {
  console.log('🌿 Green Leaf Cafe - Initializing...');
  
  // ตรวจสอบการเชื่อมต่อ API
  const apiWorking = await checkAPIHealth();
  
  if (apiWorking) {
    console.log('🚀 Loading menu from API...');
    // โหลดเมนูเริ่มต้น
    loadMenuFromAPI('all');
  } else {
    console.log('⚠️ API not available, using fallback menu');
    showError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
  }
  
  // Event Listeners สำหรับปุ่มหมวดหมู่
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // อัพเดท active class
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // โหลดเมนูตามหมวดหมู่
      const category = this.getAttribute('data-category');
      console.log(`Category button clicked: ${category}`);
      loadMenuFromAPI(category);
    });
  });
  
  // Event Listener สำหรับฟอร์มติดต่อ
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // ดึงข้อมูลจากฟอร์ม
      const formData = {
        name: this.querySelector('input[type="text"]').value.trim(),
        email: this.querySelector('input[type="email"]').value.trim(),
        message: this.querySelector('textarea').value.trim()
      };
      
      // ตรวจสอบข้อมูล
      if (!formData.name || !formData.email || !formData.message) {
        showError('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }
      
      // ส่งข้อมูล
      const success = await submitContactForm(formData);
      
      // ล้างฟอร์มหากส่งสำเร็จ
      if (success) {
        this.reset();
      }
    });
  }
  
  // Mobile hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
  
  console.log('✅ Initialization complete!');
});
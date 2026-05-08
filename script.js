// script.js - Información completa de la mascota (diseño horizontal)
document.addEventListener("DOMContentLoaded", function() {
    // Base de datos simulada de la mascota (se obtendría del QR)
    const petData = {
        name: "MAX",
        breed: "Golden Retriever",
        age: "3 años",
        weight: "28 kg",
        photoURL: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg",
        vaccines: [
            "Rabia - 12/03/2024 ✅",
            "Parvovirus - 10/01/2024 ✅",
            "Moquillo - 05/11/2023 ✅",
            "Leptospirosis - 20/08/2024 ✅",
            "Bordetella - 01/02/2025"
        ],
       owner: {
    name: "Juan Jose Pérez Hernández",
    email: "juan.jph@gmail.com",
    address: "Soriano, Colón, Querétaro"
    address: "Soriano, Colón, Querétaro"
},
        isLost: true,
        microchip: "981098123456789",
        allergies: "Ninguna conocida",
        medicalCondition: "Artritis leve (toma Galliprant)"
    };

    // 1. Actualizar nombre
    document.getElementById("petName").innerText = petData.name;
    
    // 2. Badges principales
    document.getElementById("petBreed").innerHTML = `<i class="fas fa-dog"></i> ${petData.breed}`;
    document.getElementById("petAge").innerHTML = `<i class="fas fa-birthday-cake"></i> ${petData.age}`;
    document.getElementById("petWeight").innerHTML = `<i class="fas fa-weight-hanging"></i> ${petData.weight}`;
    
    // 3. Foto grande
    const petPhoto = document.getElementById("petPhoto");
    petPhoto.src = petData.photoURL;
    petPhoto.alt = `Foto de ${petData.name}`;
    petPhoto.onerror = () => { petPhoto.src = "https://placehold.co/800x800/FFB6C1/FFFFFF?text=🐕"; };
    
    // 4. Vacunas en formato chips horizontales
    const vaccineContainer = document.getElementById("vaccineList");
    vaccineContainer.innerHTML = "";
    petData.vaccines.forEach(vac => {
        const chip = document.createElement("span");
        chip.innerHTML = `<i class="fas fa-syringe"></i> ${vac}`;
        vaccineContainer.appendChild(chip);
    });
    
    // 5. Owner info en grid horizontal (usamos owner-grid)
    const ownerGrid = document.getElementById("ownerInfo");
    ownerGrid.innerHTML = "";
    const ownerItems = [
        { icon: "fas fa-user", label: petData.owner.name },
        { icon: "fas fa-phone-alt", label: petData.owner.phone },
        { icon: "fas fa-envelope", label: petData.owner.email },
        { icon: "fas fa-map-marker-alt", label: petData.owner.address }
    ];
    ownerItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "owner-item";
        div.innerHTML = `<i class="${item.icon}"></i> <span>${item.label}</span>`;
        ownerGrid.appendChild(div);
    });
    
    // 6. Botón de llamada de emergencia
const emergencyBtn = document.getElementById("emergencyCallBtn");
const cleanPhone = petData.owner.phone.replace(/\D/g, "");
emergencyBtn.href = `tel:+${cleanPhone}`;
    
    // 7. Botón "He encontrado la mascota" por WhatsApp
const reportBtn = document.getElementById("reportFoundBtn");
const reportMsg = document.getElementById("reportMessage");

reportBtn.addEventListener("click", () => {
    const phoneWhatsApp = petData.owner.phone.replace(/\D/g, "");

    const mensaje = `Hola, encontré a tu perro ${petData.name}. Estoy viendo el QR del collar.`;

    const urlWhatsApp = `https://wa.me/${phoneWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    reportMsg.style.display = "flex";
    reportMsg.innerHTML = '<i class="fas fa-check-circle"></i> Abriendo WhatsApp para contactar al dueño...';

    window.open(urlWhatsApp, "_blank");
});
    // 8. Opcional: actualizar datos médicos del HTML con valores dinámicos (para consistencia)
    // Nota: ya están en HTML estático los medical-grid, pero para mantenerlo dinámico lo modificamos
    const medicalGrid = document.querySelector(".medical-grid");
    if (medicalGrid) {
        medicalGrid.innerHTML = `
            <div class="medical-item"><i class="fas fa-barcode"></i> <span>Microchip: ${petData.microchip}</span></div>
            <div class="medical-item"><i class="fas fa-allergies"></i> <span>Alergias: ${petData.allergies}</span></div>
            <div class="medical-item"><i class="fas fa-heartbeat"></i> <span>Condición: ${petData.medicalCondition}</span></div>
            <div class="medical-item"><i class="fas fa-calendar-check"></i> <span>Última revisión: 15/02/2025</span></div>
        `;
    }
    
    // 9. Si no está perdida, cambiar el badge y comportamiento
    if (!petData.isLost) {
        const lostBadge = document.getElementById("lostStatus");
        lostBadge.innerHTML = '<i class="fas fa-check-circle"></i> MASCOTA EN CASA - NO ESTÁ PERDIDA';
        lostBadge.style.backgroundColor = "#059669";
        lostBadge.style.animation = "none";
    } else {
        // Mantener rojo
        console.log("Modo pérdida activo");
    }
});

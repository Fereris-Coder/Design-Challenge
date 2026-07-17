// App Logic for Haru Design Challenge Presentation & Interactive Mockup

// 1. Slide Navigation Logic
let currentSlide = 1;
const totalSlides = 5;

const prevBtn = document.getElementById('prev-slide-btn');
const nextBtn = document.getElementById('next-slide-btn');
const currentSlideText = document.getElementById('current-slide');

function showSlide(slideNum) {
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });

    // Show target slide
    const targetSlide = document.getElementById(`slide-${slideNum}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }

    // Update buttons state
    prevBtn.disabled = (slideNum === 1);
    nextBtn.innerHTML = (slideNum === totalSlides) ? 
        'Finish <i class="fa-solid fa-flag-checkered"></i>' : 
        'Next <i class="fa-solid fa-arrow-right"></i>';

    // Update indicator
    currentSlideText.textContent = slideNum;
    currentSlide = slideNum;
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    } else {
        alert('Thank you for viewing the Haru presentation! You can continue interacting with the mobile prototype on the right.');
    }
});

// 2. Interactive Mockup Logic
const categoryInsights = {
    alimentacion: {
        title: "Food Insight",
        text: "Represents 31.6% of your spending. You shopped 3 times at Supermaxi this month. Buying fresh produce at local markets could save you around $40 per month easily.",
        color: "var(--color-alimentacion)"
    },
    transporte: {
        title: "Transport Insight",
        text: "Represents 15.8% of your spending. We registered 6 rides on ride-hailing apps (Uber/Cabify). Walking short distances under 1km would save you $25 this month.",
        color: "var(--color-transporte)"
    },
    entretenimiento: {
        title: "Entertainment Insight",
        text: "Represents 21.1% of your spending. You spent $180 on weekend outings. You have $20 left in this category to avoid exceeding your monthly savings goal.",
        color: "var(--color-entretenimiento)"
    },
    otros: {
        title: "Others Insight",
        text: "Represents 31.6% of your spending. Includes automatic fees and bank charges. We recommend splitting subscriptions (Netflix, Spotify) to track them separately.",
        color: "var(--color-otros)"
    }
};

let currentSpent = 950.00;
const monthlyIncome = 1200.00;
const targetSavings = 100.00;

// Category selection
function selectCategory(catName, amount) {
    // Toggle active state in list
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.getElementById(`cat-${catName}`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

    // Update Insight Banner
    const insightBox = document.getElementById('dynamic-insight-box');
    const insightParagraph = document.getElementById('insight-paragraph');
    const insightTitle = insightBox.querySelector('h4');
    
    const insightData = categoryInsights[catName];
    if (insightData) {
        insightTitle.textContent = insightData.title;
        insightParagraph.textContent = insightData.text;
        insightBox.style.borderColor = insightData.color;
        insightBox.style.background = `linear-gradient(135deg, ${insightData.color}25 0%, rgba(20, 19, 44, 0.5) 100%)`;
    }
}

// Auto-categorization validation
const autoCatCard = document.getElementById('auto-cat-card');
const totalSpentDisplay = document.getElementById('total-spent-display');
const freeMarginDisplay = document.getElementById('free-margin-display');
const savingsProgressBar = document.getElementById('savings-progress-bar');
const projectedSavingsVal = document.getElementById('projected-savings-val');
const savingsPercentText = document.getElementById('savings-percent-text');

function updateDashboardValues(newSpent) {
    currentSpent = newSpent;
    const freeMargin = monthlyIncome - currentSpent;
    
    // Update labels
    totalSpentDisplay.textContent = `$${currentSpent.toFixed(2)}`;
    freeMarginDisplay.textContent = `$${freeMargin.toFixed(2)}`;
    projectedSavingsVal.textContent = `$${freeMargin.toFixed(2)}`;
    
    // Savings progress percent
    const progressPercent = Math.min((freeMargin / targetSavings) * 100, 250);
    savingsProgressBar.style.width = `${Math.min(progressPercent, 100)}%`;
    savingsPercentText.textContent = `${Math.round(progressPercent)}%`;
    
    // Status text update based on free margin
    const appStatus = document.querySelector('.app-status');
    if (freeMargin >= targetSavings) {
        appStatus.textContent = "✨ Everything is okay";
        appStatus.style.color = "#FFF";
    } else if (freeMargin > 0) {
        appStatus.textContent = "⚠️ Goal in risk";
        appStatus.style.color = "var(--warning)";
    } else {
        appStatus.textContent = "🚨 Spent in negative";
        appStatus.style.color = "var(--danger)";
    }
}

function approveAutoCat() {
    autoCatCard.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    autoCatCard.style.transform = 'scale(0.9)';
    autoCatCard.style.opacity = '0';
    
    setTimeout(() => {
        autoCatCard.style.display = 'none';
        const newSpent = currentSpent + 35.00;
        updateDashboardValues(newSpent);
        
        const insightBox = document.getElementById('dynamic-insight-box');
        const insightTitle = insightBox.querySelector('h4');
        const insightParagraph = document.getElementById('insight-paragraph');
        
        insightBox.style.borderColor = "var(--success)";
        insightTitle.textContent = "✅ Transaction Confirmed";
        insightParagraph.textContent = "Added $35.00 to your Food category. Your free margin and savings rate updated dynamically in real time.";
    }, 400);
}

function dismissAutoCat() {
    autoCatCard.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    autoCatCard.style.transform = 'translateY(-20px)';
    autoCatCard.style.opacity = '0';
    
    setTimeout(() => {
        autoCatCard.style.display = 'none';
    }, 400);
}

// Modal handling
const modal = document.getElementById('category-modal');

function openCatSelector() {
    modal.classList.add('active');
}

function closeCatSelector() {
    modal.classList.remove('active');
}

function changeCatTo(categoryName) {
    closeCatSelector();
    
    autoCatCard.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    autoCatCard.style.transform = 'scale(0.9)';
    autoCatCard.style.opacity = '0';
    
    setTimeout(() => {
        autoCatCard.style.display = 'none';
        const newSpent = currentSpent + 35.00;
        updateDashboardValues(newSpent);
        
        const displayCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        
        const insightBox = document.getElementById('dynamic-insight-box');
        const insightTitle = insightBox.querySelector('h4');
        const insightParagraph = document.getElementById('insight-paragraph');
        
        insightBox.style.borderColor = "var(--primary)";
        insightTitle.textContent = `✅ Category Changed to ${displayCategory}`;
        insightParagraph.textContent = `We saved the $35.00 transaction in ${displayCategory}. Haru will learn from this correction for future purchases.`;
        
        selectCategory(categoryName, 35);
    }, 400);
}

// Initialize Dashboard values
updateDashboardValues(currentSpent);

function calculateBMI() {
    const height = document.getElementById('height').value / 100; // 转换成米
    const weight = document.getElementById('weight').value;
    
    if (!height || !weight) {
        alert('请输入身高和体重！');
        return;
    }
    
    const bmi = weight / (height * height);
    const bmiValue = bmi.toFixed(1);
    
    let category, advice, imagePath;
    
    if (bmi < 18.5) {
        category = '偏瘦';
        advice = '建议适当增加营养摄入，进行力量训练，均衡饮食以达到健康体重。<br>（快去撸铁！队友扛不住啦！!!）';
        imagePath = './images/thin.jpg';
    } else if (bmi >= 18.5 && bmi < 24) {
        category = '正常';
        advice = '恭喜！请继续保持健康的生活方式和饮食习惯。';
        imagePath = './images/normal.jpg';
    } else if (bmi >= 24 && bmi < 28) {
        category = '偏壮';
        advice = '建议适当控制饮食，增加有氧运动，保持规律作息。<br>（高贵的2.0快去战斗！）';
        imagePath = './images/overweight.jpg';
    } else {
        category = '肥胖';
        advice = '建议在医生指导下制定减重计划，控制饮食，规律运动。<br>（? 我没有金子！）';
        imagePath = './images/obese.jpg';
    }
    
    document.getElementById('bmi-value').textContent = `您的BMI值为：${bmiValue}`;
    document.getElementById('bmi-category').textContent = `体重状态：${category}`;
    document.getElementById('advice').innerHTML = `建议：${advice}`;
    
    const bmiImage = document.querySelector('#bmi-image');
    if (bmiImage) {
        bmiImage.src = imagePath;
        bmiImage.dataset.src = imagePath;
        bmiImage.style.display = 'block';
    }
} 

// 修改懒加载实现
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img.lazy-image");
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove("lazy-image");
                    observer.unobserve(img);
                }
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// 修改图片加载失败处理
document.addEventListener('error', function(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
        e.target.src = './images/default.jpg';
    }
}, true); 
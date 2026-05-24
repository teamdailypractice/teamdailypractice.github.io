const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://127.0.0.1:8001/index.html', { waitUntil: 'networkidle' });
    console.log('Title:', await page.title());
    
    const sidebarVisible = await page.isVisible('.sidebar-toc');
    console.log('Sidebar TOC Visible:', sidebarVisible);
    
    const headerBg = await page.evaluate(() => {
      const el = document.querySelector('.header-premium');
      return el ? window.getComputedStyle(el).background : 'null';
    });
    console.log('Header Background:', headerBg.includes('gradient') ? 'Gradient Found ✅' : 'Missing Gradient ❌');

    const feedbackPresent = await page.evaluate(() => {
        // Just checking if the app loaded React correctly
        return !!document.getElementById('root');
    });
    console.log('React Root Found:', feedbackPresent);

  } catch (e) {
    console.log('Navigation failed:', e.message);
  }

  await browser.close();
})();

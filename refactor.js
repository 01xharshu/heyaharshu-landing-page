const fs = require('fs');
const path = require('path');

const cssFiles = [
  'src/components/Carousel.module.css',
  'src/components/Hero.module.css',
  'src/components/Navbar.module.css'
];

let allCss = '';
for (const file of cssFiles) {
  if (fs.existsSync(file)) {
    allCss += `\n/* From ${path.basename(file)} */\n`;
    allCss += fs.readFileSync(file, 'utf8') + '\n';
  }
}

fs.appendFileSync('src/app/globals.css', allCss);

const tsxFiles = [
  'src/components/Carousel.tsx',
  'src/components/Hero.tsx',
  'src/components/Navbar.tsx',
  'src/components/Work.tsx',
  'src/app/page.tsx'
];

for (const file of tsxFiles) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Remove import styles ...
  content = content.replace(/import styles from ['"].*module\.css['"];\n?/g, '');

  // Replace className={styles.xxx} with className="xxx"
  content = content.replace(/className=\{styles\.([a-zA-Z0-9_]+)\}/g, 'className="$1"');

  // Replace className={`${styles.xxx} ${styles.yyy}`} ...
  // A simpler way is to globally replace styles.xxx with just "xxx" inside the backticks, but we have to be careful not to replace js variables.
  // We can just replace `styles.([a-zA-Z0-9_]+)` with `$1` globally within the file, because `styles.` is only used for classes.
  content = content.replace(/styles\.([a-zA-Z0-9_]+)/g, '$1');

  fs.writeFileSync(file, content);
}

for (const file of cssFiles) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

console.log("Refactoring complete");

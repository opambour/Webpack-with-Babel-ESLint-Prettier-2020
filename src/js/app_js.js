import { Addition } from './other_modules/trial';
import logos from './other_modules/logosObject';

// css file
import '../../public/css/main.css';

console.log(Addition(5, 15));

// loop through logos and insert logo object into html
const iterateLogos = logos.map((logo) => {
  return `<img src='${logo.src}' alt='${logo.alt}' title='${logo.title}'>`;
});

document.querySelector('#display_logos').innerHTML = iterateLogos.join(' ');

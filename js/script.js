'use strict';

function showArticle() {

  const clickedElement = this;

  //hide active article
  const activeArticle = document.querySelector('.post.active');
  if (activeArticle) activeArticle.classList.remove('active');

  //show new article acccoridng the link id
  const articleId = clickedElement.getAttribute('href');
  document.querySelector(articleId).classList.add('active');

  //remove active class from active links
  const activeLink = document.querySelector('.titles a.active');
  if (activeLink) activeLink.classList.remove('active');

  //add active class to clicked link
  clickedElement.classList.add('active');
}

function generateTitleLinks() {

  const articles = document.querySelectorAll('.post');
  const titleList = document.querySelector('.titles');

  titleList.innerHTML = '';
  let listHTML = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;
    const html = `<li><a href="#${articleId}" class="active"><span>${articleTitle}</span></a></li>`;
    listHTML += html;
  }

  titleList.innerHTML = listHTML;
  const articleLinks = document.querySelectorAll('.titles a');
  for (let link of articleLinks) {
    link.addEventListener('click', showArticle);
  }

}

generateTitleLinks();
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

function showArticle() {

  const clickedElement = this;

  const activeArticle = document.querySelector('.post.active');
  if (activeArticle) activeArticle.classList.remove('active');

  const articleId = clickedElement.getAttribute('href');
  document.querySelector(articleId).classList.add('active');

  const activeLink = document.querySelector('.titles a.active');
  if (activeLink) activeLink.classList.remove('active');

  clickedElement.classList.add('active');
}

function generateTitleLinks(customSelector = '') {

  const articles = document.querySelectorAll('.post' + customSelector);

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
function calculateTagsParams(tags) {
  const params = {
    min: 99,
    max: 0
  };
  for (let tag in tags) {

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

const cloudClassCount = 5;
const cloudClassPrefix = 'tag-size-';

function calculateTagClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * (cloudClassCount - 1) + 1);
  return cloudClassPrefix + classNumber;
}

const articleTagsSelector = ('.post-tags .list');

function generateTags() {
  let allTags = {};

  const articles = document.querySelectorAll('.post');

  for (let article of articles) {
    const tagsWrapper = article.querySelector(articleTagsSelector);

    let html = '';

    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const linkHTMLData = {
        id: tag
      };
      const linkHTML = templates.tagLink(linkHTMLData);
      html = html + linkHTML;

      if (!allTags[tag]) {

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      tagsWrapper.innerHTML = html;
    }

    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = {
      tags: []
    };

    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }

    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

}

generateTags();

function tagClickHandler(event) {

  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeClass = document.querySelectorAll('a.active');
  for (let activeSingle of activeClass) {
    activeSingle.classList.remove('active');
  }

  const tagLink = document.querySelectorAll(`a[href="' + href + '"]`);

  for (let tagLinkSingle of tagLink) {
    tagLinkSingle.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {

  const allLinks = document.querySelectorAll('a[href^="#tag-"]');

  for (let linkSingle of allLinks) {
    linkSingle.addEventListener('click', tagClickHandler);
  }

}

addClickListenersToTags();
const authListSelector = '.authors.list';

function generateAuthors() {
  let allAuth = {};
  const articleAuthorSelector = ('.post-author');
  const articleList = document.querySelectorAll('.post');

  for (let articleSingle of articleList) {
    const authWrapper = articleSingle.querySelector(articleAuthorSelector);

    let html = '';
    const dataAuth = articleSingle.getAttribute('data-author');
    const linkHTMLData = {
      id: dataAuth
    };

    const linkHTML = templates.authorLink(linkHTMLData);

    html = html + linkHTML;
    if (!allAuth[dataAuth]) {
      allAuth[dataAuth] = 1;
    } else {
      allAuth[dataAuth]++;
    }
    authWrapper.innerHTML = html;
    const authList = document.querySelector(authListSelector);
    const authParams = calculateTagsParams(allAuth);

    const allAuthData = {
      auths: []
    };

    for (let auth in allAuth) {
      allAuthData.auths.push({
        auth: auth,
        count: allAuth[auth],
        className: calculateTagClass(allAuth[auth], authParams)
      });
    }

    authList.innerHTML = templates.authCloudLink(allAuthData);
  }
}

generateAuthors();

function authorClickHandler(event) {

  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const authName = href.replace('#auth-', '');
  const activeClass = document.querySelectorAll('a.active');

  for (let activeSingle of activeClass) {
    activeSingle.classList.remove('active');
  }

  const authorLink = document.querySelectorAll(`a[href="' + href + '"]`);

  for (let authorLinkSingle of authorLink) {
    authorLinkSingle.classList.add('active');
  }

  generateTitleLinks('[data-author="' + authName + '"]');

}

function addClickListenersToAuthors() {

  const allLinks = document.querySelectorAll('a[href^="#auth-"]');

  for (let linkSingle of allLinks) {
    linkSingle.addEventListener('click', authorClickHandler);
  }

}
addClickListenersToAuthors();

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

function generateTitleLinks(customSelector = '') {
  // console.log(generateTitleLinks);
  const articles = document.querySelectorAll('.post' + customSelector);
  // console.log(articles);
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
    // console.log(tag + ' is used ' + tags[tag] + ' times');

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
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll('.post');
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(articleTagsSelector);
    /* [DONE]  make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    // console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      const tagLinkHTML = '<a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a>&nbsp;(' + allTags[tag] + ') ';
      // console.log('tagLinkHTML:', tagLinkHTML);
      // console.log(allTags[tag]);
      /* [NEW] generate code of a link and add it to allTagsHTML */
      // allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      allTagsHTML += tagLinkHTML;
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  // console.log(event);
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeClass = document.querySelectorAll('a.active');
  /* START LOOP: for each active tag link */
  for (let activeSingle of activeClass) {
    /* remove class active */
    activeSingle.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLink = document.querySelectorAll(`a[href="' + href + '"]`);
  /* START LOOP: for each found tag link */
  for (let tagLinkSingle of tagLink) {
    // console.log(tagLinkSingle);
    /* add class active */
    tagLinkSingle.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let linkSingle of allLinks) {
    /* add tagClickHandler as event listener for that link */
    linkSingle.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  const articleAuthorSelector = ('.post-author');
  // console.log(articleAuthorSelector);
  /* [DONE] find all articles */
  const articleList = document.querySelectorAll('.post');
  // console.log(articleList);
  /* [DONE] START LOOP: for every article: */
  for (let articleSingle of articleList) {
    /* [DONE] find tags wrapper */
    const authWrapper = articleSingle.querySelector(articleAuthorSelector);
    // console.log(authWrapper);
    /* [DONE]  make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const dataAuth = articleSingle.getAttribute('data-author');
    // console.log();
    /* START LOOP: for each tag */

    /* generate HTML of the link */
    const linkHTML = `<li><a href="#auth-${dataAuth}">${dataAuth}</a></li>`;
    /* add generated code to html variable */
    html = html + linkHTML;
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    authWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const authName = href.replace('#auth-', '');
  /* find all tag links with class active */
  const activeClass = document.querySelectorAll('a.active');
  /* START LOOP: for each active tag link */
  for (let activeSingle of activeClass) {
    /* remove class active */
    activeSingle.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLink = document.querySelectorAll(`a[href="' + href + '"]`);
  /* START LOOP: for each found tag link */
  for (let authorLinkSingle of authorLink) {
    /* add class active */
    authorLinkSingle.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + authName + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const allLinks = document.querySelectorAll('a[href^="#auth-"]');
  /* START LOOP: for each link */
  for (let linkSingle of allLinks) {
    /* add tagClickHandler as event listener for that link */
    linkSingle.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

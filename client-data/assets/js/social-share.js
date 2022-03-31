document.addEventListener('DOMContentLoaded', function() {
  const createShareHtml = function(title, shareData) {
    let anchorList = [];
    const anchorTemplate = function(item) {
      return '<a href="' + item.href + '" class="social-share__item social-share__item_' + item.name +'" title="' + item.title + '" onclick="' + item.onclick + '"></a>';
    }
    const wrapperTemplate = function(title, anchorList) {
      return '<div class="social-share__title">' + title + '</div><div class="social-share__items">' + anchorList.join('') + '</div>';
    }
    shareData.forEach(function(item) {
      anchorList.push(anchorTemplate(item));
    })
    return wrapperTemplate(title, anchorList);
  }
  const $socialShare = document.querySelector('.social-share');
  if ($socialShare) {
    const url = encodeURIComponent(location.protocol + '//' + location.host + location.pathname);
    const title = encodeURIComponent(document.title);
    const twitterUserName = 'kuzovkin_ru';
    const shareData = [
      {
        name: 'twitter',
        title: 'Twitter',
        href: 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url + '&via=' + twitterUserName,
        onclick: 'window.open(this.href, \'Twitter\', \'width=800,height=300,resizable=yes,toolbar=0,status=0\'); return false'
      },
      {
        name: 'fb',
        title: 'Facebook',
        href: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
        onclick: 'window.open(this.href, \'Facebook\', \'width=640,height=436,toolbar=0,status=0\'); return false'
      },
      {
        name: 'vk',
        title: 'ВКонтакте',
        href: 'https://vk.com/share.php?url=' + url,
        onclick: 'window.open(this.href, \'ВКонтакте\', \'width=800,height=300,toolbar=0,status=0\'); return false'
      },
      {
        name: 'telegram',
        title: 'Telegram',
        href: 'https://t.me/share/url?url=' + url + '&title=' + title,
        onclick: 'window.open(this.href, \'Telegram\', \'width=800,height=300,toolbar=0,status=0\'); return false'
      }
    ];
    const $html = createShareHtml('', shareData);
    $socialShare.innerHTML = $html;
  }
});
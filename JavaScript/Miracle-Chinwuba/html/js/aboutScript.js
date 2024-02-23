$(document).ready(function () {
  $('.hamburger').click(function () {
    $('#heading').text('Menu')
  })
  console.log($('li').parent().prop('nodeName'))
})

const displayMenu = () => {
  const small_menu = document.getElementById('small-menu')
  small_menu.classList.toggle('show')
  if (small_menu.classList.contains('show')) {
    document.getElementById('menu-img').src = 'images/x-lg.svg'
  } else {
    document.getElementById('menu-img').src = 'images/list.svg'
  }
}

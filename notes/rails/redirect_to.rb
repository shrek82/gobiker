def test
  redirect_to post_url(@post), status: :found
  redirect_to action: 'atom', status: :moved_permanently
  redirect_to post_url(@post), status: 301
  redirect_to action: 'atom', status: 302

end
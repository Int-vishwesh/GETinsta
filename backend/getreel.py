import instaloader

def get_reel_url(url):
    shortcode = url.rstrip('/').split("/")[-1]
    L = instaloader.Instaloader()
    post = instaloader.Post.from_shortcode(L.context, shortcode)

    if not post.is_video:
        raise ValueError("This URL does not point to a video/reel.")

    return post.video_url

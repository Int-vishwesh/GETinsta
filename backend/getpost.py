import instaloader

def get_post_media(url):
    shortcode = url.rstrip('/').split("/")[-1]
    L = instaloader.Instaloader()
    post = instaloader.Post.from_shortcode(L.context, shortcode)

    media_items = []

    # Carousel / sidecar post (multiple images/videos)
    if post.typename == 'GraphSidecar':
        for node in post.get_sidecar_nodes():
            if node.is_video:
                media_items.append({"type": "video", "url": node.video_url})
            else:
                media_items.append({"type": "image", "url": node.display_url})
    elif post.is_video:
        media_items.append({"type": "video", "url": post.video_url})
    else:
        media_items.append({"type": "image", "url": post.url})

    return media_items

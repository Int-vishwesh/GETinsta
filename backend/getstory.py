import instaloader

INSTAGRAM_USERNAME = "get.insta_downloader"
INSTAGRAM_PASSWORD = "projectsays"

def get_authenticated_loader():
    loader = instaloader.Instaloader()
    try:
        loader.load_session_from_file(INSTAGRAM_USERNAME)
        print("Session loaded successfully.")
    except FileNotFoundError:
        print("Logging in...")
        loader.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)
        loader.save_session_to_file()
        print("Logged in and session saved.")
    return loader

def get_story_urls(username):
    username = username.lstrip('@').strip()
    loader = get_authenticated_loader()
    profile = instaloader.Profile.from_username(loader.context, username)
    user_id = profile.userid

    stories = list(loader.get_stories(userids=[user_id]))

    if not stories:
        return []

    story_urls = []
    for story in stories:
        for item in story.get_items():
            if item.is_video:
                story_urls.append({"type": "video", "url": item.video_url})
            else:
                story_urls.append({"type": "image", "url": item.url})

    return story_urls
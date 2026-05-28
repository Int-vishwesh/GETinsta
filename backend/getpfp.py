import instaloader

def get_pfp_url(username):
    username = username.lstrip('@').strip()
    L = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(L.context, username)
    return profile.profile_pic_url

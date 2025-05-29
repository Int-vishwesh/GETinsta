from flask import Flask, request, jsonify
from flask_cors import CORS
import instaloader

app = Flask(__name__)
CORS(app)

# Replace with your actual username and password
INSTAGRAM_USERNAME = "get.insta_downloader"
INSTAGRAM_PASSWORD = "projectsays"

# Create an Instaloader instance and login
loader = instaloader.Instaloader()

try:
    # Load session if available
    loader.load_session_from_file(INSTAGRAM_USERNAME)
    print("Session loaded successfully.")
except FileNotFoundError:
    # Login and save session if session file is not found
    print("Logging in...")
    loader.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)
    loader.save_session_to_file()
    print("Logged in and session saved.")

@app.route('/download-story', methods=['POST'])
def download_story():
    try:
        data = request.json
        username = data['username']
        
        # Debugging: Print the username received from the frontend
        print(f"Received request for username: {username}")

        # Get the profile
        profile = instaloader.Profile.from_username(loader.context, username)
        
        # Debugging: Log the profile information
        print(f"Profile info: {profile}")

        # Get user ID
        user_id = profile.userid
        print(f"User ID: {user_id}")

        # Fetch stories using the user ID
        stories = list(loader.get_stories(userids=[user_id]))

        # Debugging: Check if stories are fetched
        print(f"Stories fetched: {len(stories)}")

        if not stories:
            return jsonify({"error": "No stories available for this user."}), 400

        # Collect the URLs of the stories
        story_urls = []
        for story in stories:
            for item in story.get_items():
                story_urls.append(item.video_url if item.is_video else item.url)

        return jsonify({"story_urls": story_urls})

    except Exception as e:
        # Debugging: Log the error
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
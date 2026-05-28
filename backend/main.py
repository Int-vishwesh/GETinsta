from flask import Flask, request, jsonify
from flask_cors import CORS
from getreel import get_reel_url
from getpost import get_post_media
from getpfp import get_pfp_url
from getstory import get_story_urls

app = Flask(__name__)
CORS(app)

@app.route('/download', methods=['POST'])
def download_reel():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400
    try:
        return jsonify({"reel_url": get_reel_url(url)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/download-post', methods=['POST'])
def download_post():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400
    try:
        return jsonify({"media": get_post_media(url)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/download-pfp', methods=['POST'])
def download_pfp():
    data = request.json
    username = data.get('username')
    if not username:
        return jsonify({"error": "Username is required"}), 400
    try:
        return jsonify({"pfp_url": get_pfp_url(username)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/download-story', methods=['POST'])
def download_story():
    data = request.json
    username = data.get('username')
    if not username:
        return jsonify({"error": "Username is required"}), 400
    try:
        urls = get_story_urls(username)
        if not urls:
            return jsonify({"error": "No stories available for this user."}), 400
        return jsonify({"story_urls": urls})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

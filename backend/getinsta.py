from flask import Flask, request, jsonify
from flask_cors import CORS
import instaloader

app = Flask(__name__)
CORS(app)

@app.route('/download', methods=['POST'])
def download():
    data = request.json
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL is required"}), 400

    shortcode = url.split("/")[-2]

    try:
        reel_url = get_reel_url(shortcode)
        return jsonify({"reel_url": reel_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_reel_url(shortcode):
    L = instaloader.Instaloader()
    post = instaloader.Post.from_shortcode(L.context, shortcode)
    return post.video_url  # Return the reel video URL

if __name__ == "__main__":
    app.run(debug=True)

import json
import time
from selenium import webdriver

# SWARATTIVE LocalStorage Initializer
# Use this script to inject the default data directly into your browser

def main():
    driver = webdriver.Chrome() # Ensure you have chromedriver installed
    
    # Path to your local booking file
    file_path = "file:///D:/project/swarattive/booking.html"
    
    driver.get(file_path)
    time.sleep(1) # wait for load

    # Data to inject
    defaults = {
        "swr_booking": {
            "services": [
                {"value": "wedding", "label": "Wedding Photography"},
                {"value": "prewedding", "label": "Pre-Wedding"},
                {"value": "portrait", "label": "Portrait Session"},
                {"value": "commercial", "label": "Commercial Shoot"}
            ],
            "payments": [
                {"label": "Bank Mandiri", "value": "123-456-789-0"},
                {"label": "BCA", "value": "098-765-432-1"},
                {"label": "OVO / DANA", "value": "0812-3456-7890"}
            ]
        },
        "swr_about": {
            "teamMembers": [
                {"name": "Andi Prasetyo", "role": "Lead Photographer", "image": "images/photo.png"},
                {"name": "Dewi Kusuma", "role": "Creative Director", "image": "images/photo.png"},
                {"name": "Rina Wulandari", "role": "Photo Editor", "image": "images/photo.png"}
            ]
        }
    }

    # Injecting via Javascript
    for key, val in defaults.items():
        script = f"localStorage.setItem('{key}', '{json.dumps(val)}');"
        driver.execute_script(script)
        print(f"Injected {key}")

    print("Success! Refreshing page...")
    driver.refresh()
    time.sleep(3)
    driver.quit()

if __name__ == "__main__":
    print("This script will open Chrome and inject the default booking data into localStorage.")
    print("Make sure you have Chrome installed and D:/project/swarattive/booking.html exists.")
    # main() # Commented out by default to avoid auto-running in restricted env

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())
# Will wait 5 seconds to find elements:
driver.implicitly_wait(10)
driver.get("https://sui-wallet-staging.onrender.com/")
# elem = driver.find_element(By.ID, "ethos-sign-in-button")
signInButton = driver.find_element(By.XPATH, '//*[@id="__next"]/div/main/div[1]/div/div/div[2]/div/div[1]/div[1]/button')
signInButton.click()
# emailInput = driver.find_element(By.CSS_SELECTOR, "input[type=email]")
# emailInput.send_keys("me@test.com")

# sendEmailButton = driver.find_element(By.CSS_SELECTOR, "button[type=submit]")
sendEmailButton = driver.find_element(By.XPATH, '//*[@id="__next"]/div/main/div[1]/div/div/div[2]/div/div[1]/div[1]/div[4]/div[3]/div/div/div/div[2]/div[2]/form/button')
sendEmailButton.click()

emailSentConfirmation = driver.find_element(By.XPATH, '//*[@id="headlessui-dialog-title-:r7:"]')
print('emailSentConfirmation:', emailSentConfirmation)
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()
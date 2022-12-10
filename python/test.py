import time, os, pymysql
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from pymysql.constants import CLIENT

chrome_options = Options()
prefs = {'download.default_directory' : r'C:\test'}
chrome_options.add_experimental_option('prefs', prefs)
driver = webdriver.Chrome(chrome_options=chrome_options)
driver.maximize_window()

driver.get("https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/sfc/tot/toteaiList.jsp?emgPage=Y&menuSeq=111") # 자연재해 피해량 사이트 접속

select = Select(driver.find_element(By.ID,'sbType1')) # 년도별현황 선택
select.select_by_index(1) #select index value
time.sleep(1)

select = Select(driver.find_element(By.ID,'sbType2')) # 시도 선택
select.select_by_index(1)
time.sleep(1)

select = Select(driver.find_element(By.ID,'sbReason')) # 자연재해 종류 선택
select.select_by_index(5)
time.sleep(1)

driver.find_element(By.CLASS_NAME,'search_btn').click() # 검색 버튼 클릭
time.sleep(1)

driver.find_element(By.CLASS_NAME,'export_btn').click() # 파일 다운로드 버튼 클릭
time.sleep(4)

new_filename = 'C:\\test\\typhoon.xls' # 새로운 파일 이름

os.rename('C:\\test\\자연재난상황통계.xls', new_filename) # 다운받은 파일 이름 변경

driver.get("https://products.aspose.app/cells/conversion/excel-to-json") # EXCEL TO JSON 변환 페이지 접속

driver.find_element(By.CLASS_NAME,'upload-file-input').send_keys("C:\\test\\typhoon.xls") # 엑셀 업로드
time.sleep(1)

driver.find_element(By.ID,'uploadButton').click() # 업로드 버튼 클릭
time.sleep(5)

driver.find_element(By.ID,'copyBtn').click() # JSON 복사
time.sleep(2)

driver.get("https://www.convertjson.com/json-to-sql.htm") # JSON TO QUERY 변환 페이지 접속
time.sleep(2)
driver.find_element(By.ID,'txt1').send_keys(Keys.CONTROL,'v') # JSON 붙여넣기

# time.sleep(3)
# xpath = "//*[@id='fkey1']"
# driver.find_element(By.XPATH,xpath).click() # 기본 키 체크

# time.sleep(2)
# xpath = "//*[@id='fkey1']"
# driver.find_element(By.XPATH,xpath).click() # 기본 키 체크 해제

# time.sleep(2)
# xpath = "//*[@id='divOptions']/table/tbody/tr[1]/th[8]/input" # 널값 허용 체크
# print(xpath)
# driver.find_element(By.XPATH,xpath).click()

# time.sleep(2)
# xpath = "//*[@id='divOptions']/table/tbody/tr[1]/th[8]/input" # 널값 허용 체크 해제
# driver.find_element(By.XPATH,xpath).click()

time.sleep(2)
xpath = "//*[@id='tabname']"
driver.find_element(By.XPATH,xpath).clear # 테이블 이름 정하는 텍스트 비우기
time.sleep(2)
driver.find_element(By.XPATH,xpath).clear # 테이블 이름 정하는 텍스트 비우기

time.sleep(2)
driver.find_element(By.XPATH,xpath).send_keys("typhoontest")

time.sleep(2)
xpath = "//*[@id='btnRun']"
driver.find_element(By.XPATH,xpath).send_keys(Keys.ENTER)

time.sleep(2)
xpath = "//*[@id='fn']"
driver.find_element(By.XPATH,xpath).clear() # 파일 이름 정하는 텍스트 비우기

time.sleep(2)
driver.find_element(By.XPATH,xpath).send_keys("typhoonQuery") # 파일 이름 typhoonQuery로 지정

time.sleep(2)
xpath = "//*[@id='frm1']/div/div[1]/div[3]/input[2]"
driver.find_element(By.XPATH,xpath).send_keys(Keys.ENTER) # 쿼리문 다운

time.sleep(5)

driver.quit() # 웹 종료


## 자연재해 피해 테이블 생성 코드
pymysql.install_as_MySQLdb()

def replace_in_file(file_path, old_str, new_str): # 파일 내 문자열 바꾸는 함수
    # 파일 읽어들이기
    fr = open(file_path, 'rt', encoding='UTF8')
    lines = fr.readlines()
    fr.close()

    # old_str -> new_str 치환
    fw = open(file_path, 'w', encoding='UTF8')
    for line in lines:
        fw.write(line.replace(old_str, new_str))
    fw.close()

# 호출: sql파일 수정
replace_in_file("C:\\test\\typhoonQuery.sql", "INTEGER", "BIGINT") # INTEGER -> BIGINT로 수정
replace_in_file("C:\\test\\typhoonQuery.sql", "NOT NULL", "") # NOT NULL 없애기
replace_in_file("C:\\test\\typhoonQuery.sql", "PRIMARY KEY", "") # PRIMARY KEY 없애기

#디비 연동  **CLIENT.MULTI_STATEMENTS = 멀티쿼리를 지원하는 옵션**
conn = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='test_db', charset='utf8', client_flag=CLIENT.MULTI_STATEMENTS)
cursor = conn.cursor()

sql = open("C:\\test\\typhoonQuery.sql", encoding='utf8').read() # sql 파일 읽기
cursor.execute(sql) # sql 읽은 거 실행
cursor.fetchall()
conn.commit() # 커밋
conn.close()
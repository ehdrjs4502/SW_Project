import pymysql
from pymysql.constants import CLIENT

pymysql.install_as_MySQLdb()

def replace_in_file(file_path, old_str, new_str):
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
replace_in_file("C:\\test\\typhoonQuery.sql", "INTEGER", "BIGINT")
replace_in_file("C:\\test\\typhoonQuery.sql", "NOT NULL", "")
replace_in_file("C:\\test\\typhoonQuery.sql", "PRIMARY KEY", "")

#디비 연동
conn = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='test_db', charset='utf8', client_flag=CLIENT.MULTI_STATEMENTS)
cursor = conn.cursor()

sql = open("C:\\test\\typhoonQuery.sql", encoding='utf8').read() # sql 파일 읽기
cursor.execute(sql) # sql 읽은 거 실행
cursor.fetchall()
conn.commit() # 커밋
conn.close()





# 엑셀 xls 형식을 xlsx로 바꾸는 코드
# import win32com.client as win32

# fname = "C:\\test\\test.xls"
# print(fname)
# excel = win32.gencache.EnsureDispatch('Excel.Application')
# wb = excel.Workbooks.Open(fname)

# wb.SaveAs(fname + 'x', FileFormat = 51)
# wb.close()
# excel.Application.Quit()
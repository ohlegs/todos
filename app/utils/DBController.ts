import SQLite, {
  SQLErrors,
  type SQLError,
  type SQLiteDatabase,
} from 'react-native-sqlite-storage';

export const ID = 'id';
export const TASKS = 'tasks';
// ################################//
export const table_name = 'task_list';

class DBController {
  db: Promise<SQLiteDatabase> = SQLite.openDatabase(
    'table_name.db',
    e => {
      console.log(e);
    },
    e => {
      console.log(e);
    },
  );

  public async checkDB(setData) {
    (await this.db).transaction(txn => {
      txn.executeSql(
        `SELECT * FROM sqlite_master WHERE type='table' AND name='${table_name}';`,
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS task_list(id INTEGER PRIMARY KEY, tasks TEXT)',
              [],
            );
          }
          this.getDB(setData);
        },
      );
    });
  }

  public async insertDB(columns: [string], data: [string]): Promise<void> {
    console.log([...data]);
    (await this.db).transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${table_name} (${columns}) VALUES (${[
          ...Array(columns.length).keys(),
        ]
          .fill('?')
          .join()})`,
        data,
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Data Inserted Successfully....');
          } else {
            console.log('Failed....');
          }
        },
      );
    });
  }

  public async getDB(setData) {
    (await this.db).transaction(tx => {
      tx.executeSql(`SELECT * FROM ${table_name}`, [], (tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setData(temp);
      });
    });
  }

  public async updateByIdDB(columns: [string], data: [string], id: number) {
    (await this.db).transaction(
      tx => {
        tx.executeSql(
          `UPDATE task_list SET (${columns})=? WHERE id=${id}`,
          [data],
          (tx, results) => {},
        );
      },
      (e: string) => {
        console.log(e);
      },
    );
  }

  public async removeByIdDB(id: number) {
    (await this.db).transaction(
      tx => {
        tx.executeSql(`DELETE FROM  task_list WHERE id=${id}`, [], () => {});
      },
      (e: SQLError) => {
        console.log(e);
      },
    );
  }
}
export default new DBController();

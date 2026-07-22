const sql = require("mssql/msnodesqlv8");

async function test() {

    try {

        const pool = await sql.connect({

            server: "MYOFFICE",

            database: "ONDC_LogisticsDB",

            driver: "msnodesqlv8",

            options: {
                trustedConnection: true,
                trustServerCertificate: true
            }

        });

        console.log("SUCCESS");

        const result = await pool.request()
            .query("SELECT @@VERSION AS Version");

        console.log(result.recordset);

        process.exit(0);

    } catch (err) {

        console.error(err);

        process.exit(1);

    }

}

test();
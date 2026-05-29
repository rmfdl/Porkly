// Import the library into your project
const easyinvoice = require("easyinvoice");

// Create your invoice! Easy!
var data = {
  apiKey: "free", // Please register to receive a production apiKey: https://app.budgetinvoice.com/register
  mode: "development", // Production or development, defaults to production
};

async function generateInvoice() {
  try {
    const result = await easyinvoice.createInvoice(data);

    easyinvoice.print(result.pdf);
  } catch (error) {
    // Handle the error
    console.log(error);
  }
}

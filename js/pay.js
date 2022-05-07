$.fn.readBank = function() {

    $.get("../api/read_payment.php", function(messages) {
        var payDiv = `<div>`;
        $.each(messages, function(i, messages) {

            var bankLogo = messages.bank_logo;
            var bankName = messages.bank_name;
            var accNumber = messages.acc_number;
            var accName = messages.acc_name;
            var phone = messages.phone;

            payDiv += `<div>


    
                <div style="overflow-x:auto;">
                    <table style="width:100%" class="table table-striped">
                        <tr>
                            <th>Bank:</th>
                            <td><img src="../upload/` + bankLogo + ` " alt="Bank Logo" style="height: 65px; width: 90px; border-radius: 8px;"> ` + bankName + `</td>
                        </tr>
                        <tr>
                            <th>Account Number:</th>
                            <td>` + accNumber + `</td>
                        </tr>
                        <tr>
                            <th>Account Name:</th>
                            <td>` + accName + `</td>
                        </tr>
                    </table>
                </div>
                
                
            </div>`;
        });
        payDiv += `</div>`;

        $('#proAllP').html(payDiv);

    });
    var ban2 = `<h4 style="padding:2%;" class="heads4">Our Bank Details For Payment</h4>`;
    $('.BankD').html(ban2);
}
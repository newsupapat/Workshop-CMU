const flowAccountService = require('./flow-account-service')
const axios = require('axios')

jest.mock('./flow-account-service.js')
jest.mock('axios')

describe('purchases function', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('Excluded tax type id == 2 isVatInclusive = false isVat = true ', async () => {
    // Mock data
    const method = 'POST'
    const accessToken = 'EDZRMzgeayTfVmhgfMghzFEHJSzlNGBU3PhvJfpJ_cQ'
    const branchData = {
      res_name: 'Hang out',
      br_name: 'Tha sala',
      address: 'Tha sala',
      tax_id: null,
      tax_include_flag: '0',
      tax: '7.00',
      branch_id: 31495,
      flow_acct_flag: '1',
      flow_acct_sync_type: '1',
      expires_in: '172800',
      access_token: 'EDZRMzgeayTfVmhgfMghzFEHJSzlNGBU3PhvJfpJ_cQ',
      refresh_token: '5Vz1LyRqPOj012AubJ40T_PqkpLHxuHRyCdKjTfxnWo',
      update_dt: '2024-03-28T09:33:28.622Z',
      email: 'noey@foodstory.co',
      flow_acct_version: '2',
      expires_time: '2024-03-29T04:54:45.870Z'
    }
    const unit_object = {
      1: { name: 'Gallon', ab_name: 'gal' },
      2: { name: 'Quart', ab_name: 'qt' },
      3: { name: 'Pint', ab_name: 'pt' },
      4: { name: 'Cup', ab_name: 'c' },
      5: { name: 'Fluid Ounce', ab_name: 'fl oz' },
      6: { name: 'Ounce', ab_name: 'oz' },
      7: { name: 'Tablespoon', ab_name: 'tbsp' },
      8: { name: 'Teaspoon', ab_name: 'tsp' },
      9: { name: 'Liter', ab_name: 'l' },
      10: { name: 'Milliliter', ab_name: 'ml' },
      11: { name: 'Kilogram', ab_name: 'kg' },
      12: { name: 'Gram', ab_name: 'g' },
      13: { name: 'Milligram', ab_name: 'mg' },
      14: { name: 'Pound', ab_name: 'lb' },
      15: { name: 'Pieces', ab_name: 'pcs' },
      16: { name: 'Percent', ab_name: '%' },
      17: { name: 'Bottle', ab_name: 'btl' },
      18: { name: 'Can', ab_name: 'can' },
      19: { name: 'Pack', ab_name: 'pk' },
      20: { name: 'Bag', ab_name: 'bag' },
      21: { name: 'Box', ab_name: 'box' },
      22: { name: 'Portion', ab_name: 'portn' }
    }
    const inventoryList = [
      {
        gr_id: 10051023,
        po_code: 'PO2024030127',
        tax_type_id: '2',
        tax_percent: '7.00',
        credit_term: '0',
        flow_acct_sync_flag: '1',
        due_date: null,
        api_ri_ref: 7903745,
        inv_name: 'ไดฟุกุ ชาเขียว 40g.(20ลูก/แพ็ค , 5แพ็ค/ลัง)',
        inv_code: 'LOC2000028',
        item_tax: null,
        price: '10.00',
        deliver_qnt: '10.0000000',
        restock_qnt: '10.0000000',
        restock_price: '10.00',
        invoice_code: '',
        gr_header_id: 1336407,
        inv_unit_id: 15,
        deliver_dt: '2024-03-28',
        sup_name: null,
        sup_address: null,
        sup_phone1: null,
        sup_phone2: null,
        sup_tax_id: null
      }
    ]

    flowAccountService.purchases.mockResolvedValue({
      contactName: 'Untitled Supplier',
      contactAddress: null,
      contactTaxId: null,
      contactPerson: null,
      contactEmail: '',
      publishedOn: '2024-03-28',
      creditDays: '0',
      dueDate: '2024-03-28',
      salesName: '',
      reference: 'PO2024030127',
      isVatInclusive: false,
      totalAfterDiscount: 100,
      isVat: true,
      vatAmount: '0.00',
      grandTotal: 100,
      internalNotes: 'PO: PO2024030127  InvoiceNo: ',
      documentStructureType: 'SimpleDocument',
      items: [
        {
          type: 3,
          name: 'ไดฟุกุ ชาเขียว 40g.(20ลูก/แพ็ค , 5แพ็ค/ลัง)',
          unitName: 'pcs',
          quantity: '10.0000000',
          pricePerUnit: '10.00',
          total: 100
        }
      ],
      externalDocumentId: 'foodstory-1336407',
      saleAndPurchaseChannel: 'foodstory'
    })

    const result = await flowAccountService.purchases(
      method,
      accessToken,
      branchData,
      unit_object,
      inventoryList
    )

    expect(result).toEqual({
      contactName: 'Untitled Supplier',
      contactAddress: null,
      contactTaxId: null,
      contactPerson: null,
      contactEmail: '',
      publishedOn: '2024-03-28',
      creditDays: '0',
      dueDate: '2024-03-28',
      salesName: '',
      reference: 'PO2024030127',
      isVatInclusive: false,
      totalAfterDiscount: 100,
      isVat: true,
      vatAmount: '0.00',
      grandTotal: 100,
      internalNotes: 'PO: PO2024030127  InvoiceNo: ',
      documentStructureType: 'SimpleDocument',
      items: [
        {
          type: 3,
          name: 'ไดฟุกุ ชาเขียว 40g.(20ลูก/แพ็ค , 5แพ็ค/ลัง)',
          unitName: 'pcs',
          quantity: '10.0000000',
          pricePerUnit: '10.00',
          total: 100
        }
      ],
      externalDocumentId: 'foodstory-1336407',
      saleAndPurchaseChannel: 'foodstory'
    })
  })

  it('Inclusive tax type id == 1 return isVatInclusive = true isVat = true ', async () => {
    // Mock data
    const method = 'POST'
    const accessToken = 'EDZRMzgeayTfVmhgfMghzFEHJSzlNGBU3PhvJfpJ_cQ'
    const branchData = {
      res_name: 'ออร์ก้า หมูกระทะ แจ่วฮ้อน',
      br_name: 'ออร์ก้า ชาบู สุวรรณภูมิ',
      address: '658/4 หมู่ 5 สระคู สุวรรณภูมิ ร้อยเอ็ด 45130',
      tax_id: null,
      tax_include_flag: '1',
      tax: '7.00',
      branch_id: 6953,
      flow_acct_flag: '1',
      flow_acct_sync_type: '1',
      expires_in: '172800',
      access_token: 'HahPuzIK6ka1z_FzV1_GAD0veMS6Sp-Yoox9-XfTQE0',
      refresh_token: 'EeYtbB-1gTiX4wUixMAgKWxjSd_AcIpnaMnAOfeRAqs',
      update_dt: '2024-03-28T07:08:36.338Z',
      email: 'chawanat.non@gmail.com',
      flow_acct_version: '2',
      expires_time: '2024-03-29T11:23:13.308Z'
    }
    const unit_object = {
      1: { name: 'Gallon', ab_name: 'gal' },
      2: { name: 'Quart', ab_name: 'qt' },
      3: { name: 'Pint', ab_name: 'pt' },
      4: { name: 'Cup', ab_name: 'c' },
      5: { name: 'Fluid Ounce', ab_name: 'fl oz' },
      6: { name: 'Ounce', ab_name: 'oz' },
      7: { name: 'Tablespoon', ab_name: 'tbsp' },
      8: { name: 'Teaspoon', ab_name: 'tsp' },
      9: { name: 'Liter', ab_name: 'l' },
      10: { name: 'Milliliter', ab_name: 'ml' },
      11: { name: 'Kilogram', ab_name: 'kg' },
      12: { name: 'Gram', ab_name: 'g' },
      13: { name: 'Milligram', ab_name: 'mg' },
      14: { name: 'Pound', ab_name: 'lb' },
      15: { name: 'Pieces', ab_name: 'pcs' },
      16: { name: 'Percent', ab_name: '%' },
      17: { name: 'Bottle', ab_name: 'btl' },
      18: { name: 'Can', ab_name: 'can' },
      19: { name: 'Pack', ab_name: 'pk' },
      20: { name: 'Bag', ab_name: 'bag' },
      21: { name: 'Box', ab_name: 'box' },
      22: { name: 'Portion', ab_name: 'portn' }
    }
    const inventoryList = [
      {
        gr_id: 10051751,
        po_code: 'PO2024034680',
        tax_type_id: '1',
        tax_percent: '7.00',
        credit_term: '0',
        flow_acct_sync_flag: '1',
        due_date: null,
        api_ri_ref: 7904351,
        inv_name: 'หมูสันคอ',
        inv_code: '12000001',
        item_tax: '0',
        price: '125.00',
        deliver_qnt: '12.0000000',
        restock_qnt: '12.0000000',
        restock_price: '125.00',
        invoice_code: '',
        gr_header_id: 1336556,
        inv_unit_id: 11,
        deliver_dt: '2024-03-28',
        sup_name: 'บริษัท เบทาโกรเกษตรอุตสาหกรรม จำกัด',
        sup_address:
          '143 หมู่ที่ 1 ตำบลสระคู อำเภอสุวรรณภูมิ จังหวัดร้อยเอ็ด 45130',
        sup_phone1: '',
        sup_phone2: '',
        sup_tax_id: '0105516006448'
      },
      {
        gr_id: 10051752,
        po_code: 'PO2024034680',
        tax_type_id: '1',
        tax_percent: '7.00',
        credit_term: '0',
        flow_acct_sync_flag: '1',
        due_date: null,
        api_ri_ref: 7904351,
        inv_name: 'หมูสามชั้น',
        inv_code: '12000003',
        item_tax: '0',
        price: '150.00',
        deliver_qnt: '37.0600000',
        restock_qnt: '37.0600000',
        restock_price: '150.00',
        invoice_code: '',
        gr_header_id: 1336556,
        inv_unit_id: 11,
        deliver_dt: '2024-03-28',
        sup_name: 'บริษัท เบทาโกรเกษตรอุตสาหกรรม จำกัด',
        sup_address:
          '143 หมู่ที่ 1 ตำบลสระคู อำเภอสุวรรณภูมิ จังหวัดร้อยเอ็ด 45130',
        sup_phone1: '',
        sup_phone2: '',
        sup_tax_id: '0105516006448'
      }
    ]

    flowAccountService.purchases.mockResolvedValue({
      contactName: 'บริษัท เบทาโกรเกษตรอุตสาหกรรม จำกัด',
      contactAddress:
        '143 หมู่ที่ 1 ตำบลสระคู อำเภอสุวรรณภูมิ จังหวัดร้อยเอ็ด 45130',
      contactTaxId: '0105516006448',
      contactPerson: 'บริษัท เบทาโกรเกษตรอุตสาหกรรม จำกัด',
      contactEmail: '',
      publishedOn: '2024-03-28',
      creditDays: '0',
      dueDate: '2024-03-28',
      salesName: '',
      reference: 'PO2024034680',
      isVatInclusive: true,
      totalAfterDiscount: 7059,
      isVat: true,
      vatAmount: '0.00',
      grandTotal: 7059,
      internalNotes: 'PO: PO2024034680 \\n InvoiceNo: ',
      documentStructureType: 'SimpleDocument',
      items: [
        {
          type: 3,
          name: 'หมูสันคอ',
          unitName: 'kg',
          quantity: '12.0000000',
          pricePerUnit: '125.00',
          total: 1500
        },
        {
          type: 3,
          name: 'หมูสามชั้น',
          unitName: 'kg',
          quantity: '37.0600000',
          pricePerUnit: '150.00',
          total: 5559
        }
      ],
      externalDocumentId: 'foodstory-1336556',
      saleAndPurchaseChannel: 'foodstory'
    })

    const result = await flowAccountService.purchases(
      method,
      accessToken,
      branchData,
      unit_object,
      inventoryList
    )

    expect(result).toEqual({
      contactName: 'บริษัท เบทาโกรเกษตรอุตสาหกรรม จำกัด',
      contactAddress:
        '143 หมู่ที่ 1 ตำบลสระคู อำเภอสุวรรณภูมิ จังหวัดร้อยเอ็ด 45130',
      contactTaxId: '0105516006448',
      contactPerson: 'บริษัท เบทาโกรเกษตรอุตสาหกรรม จำกัด',
      contactEmail: '',
      publishedOn: '2024-03-28',
      creditDays: '0',
      dueDate: '2024-03-28',
      salesName: '',
      reference: 'PO2024034680',
      isVatInclusive: true,
      totalAfterDiscount: 7059,
      isVat: true,
      vatAmount: '0.00',
      grandTotal: 7059,
      internalNotes: 'PO: PO2024034680 \\n InvoiceNo: ',
      documentStructureType: 'SimpleDocument',
      items: [
        {
          type: 3,
          name: 'หมูสันคอ',
          unitName: 'kg',
          quantity: '12.0000000',
          pricePerUnit: '125.00',
          total: 1500
        },
        {
          type: 3,
          name: 'หมูสามชั้น',
          unitName: 'kg',
          quantity: '37.0600000',
          pricePerUnit: '150.00',
          total: 5559
        }
      ],
      externalDocumentId: 'foodstory-1336556',
      saleAndPurchaseChannel: 'foodstory'
    })
  })

  it('Inclusive tax type id == 0 return isVatInclusive = false isVat = false ', async () => {
    // Mock data
    const method = 'PUT'
    const accessToken = 'EDZRMzgeayTfVmhgfMghzFEHJSzlNGBU3PhvJfpJ_cQ'
    const branchData = {
      res_name: 'Hang out',
      br_name: 'Tha sala',
      address: 'Tha sala',
      tax_id: null,
      tax_include_flag: '0',
      tax: '7.00',
      branch_id: 31495,
      flow_acct_flag: '1',
      flow_acct_sync_type: '1',
      expires_in: '172800',
      access_token: 'EDZRMzgeayTfVmhgfMghzFEHJSzlNGBU3PhvJfpJ_cQ',
      refresh_token: '5Vz1LyRqPOj012AubJ40T_PqkpLHxuHRyCdKjTfxnWo',
      update_dt: '2024-03-28T09:33:28.622Z',
      email: 'noey@foodstory.co',
      flow_acct_version: '2',
      expires_time: '2024-03-29T04:54:45.870Z'
    }
    const unit_object = {
      1: { name: 'Gallon', ab_name: 'gal' },
      2: { name: 'Quart', ab_name: 'qt' },
      3: { name: 'Pint', ab_name: 'pt' },
      4: { name: 'Cup', ab_name: 'c' },
      5: { name: 'Fluid Ounce', ab_name: 'fl oz' },
      6: { name: 'Ounce', ab_name: 'oz' },
      7: { name: 'Tablespoon', ab_name: 'tbsp' },
      8: { name: 'Teaspoon', ab_name: 'tsp' },
      9: { name: 'Liter', ab_name: 'l' },
      10: { name: 'Milliliter', ab_name: 'ml' },
      11: { name: 'Kilogram', ab_name: 'kg' },
      12: { name: 'Gram', ab_name: 'g' },
      13: { name: 'Milligram', ab_name: 'mg' },
      14: { name: 'Pound', ab_name: 'lb' },
      15: { name: 'Pieces', ab_name: 'pcs' },
      16: { name: 'Percent', ab_name: '%' },
      17: { name: 'Bottle', ab_name: 'btl' },
      18: { name: 'Can', ab_name: 'can' },
      19: { name: 'Pack', ab_name: 'pk' },
      20: { name: 'Bag', ab_name: 'bag' },
      21: { name: 'Box', ab_name: 'box' },
      22: { name: 'Portion', ab_name: 'portn' }
    }
    const inventoryList = [
      {
        gr_id: 10031762,
        po_code: 'PO2024030121',
        tax_type_id: '0',
        tax_percent: '7.00',
        credit_term: '0',
        flow_acct_sync_flag: '1',
        due_date: null,
        api_ri_ref: 7892819,
        inv_name: 'เบียร์อาซาฮี 330 cc.',
        inv_code: 'LOC0000003',
        item_tax: null,
        price: '120.00',
        deliver_qnt: '2.0000000',
        restock_qnt: '2.0000000',
        restock_price: '120.00',
        invoice_code: '',
        gr_header_id: 1333612,
        inv_unit_id: 17,
        deliver_dt: '2024-03-27',
        sup_name: null,
        sup_address: null,
        sup_phone1: null,
        sup_phone2: null,
        sup_tax_id: null
      },
      {
        gr_id: 10031763,
        po_code: 'PO2024030121',
        tax_type_id: '0',
        tax_percent: '7.00',
        credit_term: '0',
        flow_acct_sync_flag: '1',
        due_date: null,
        api_ri_ref: 7892819,
        inv_name: 'เบียร์ Kirin 330cc.',
        inv_code: 'LOC0000004',
        item_tax: null,
        price: '100.00',
        deliver_qnt: '2.0000000',
        restock_qnt: '2.0000000',
        restock_price: '100.00',
        invoice_code: '',
        gr_header_id: 1333612,
        inv_unit_id: 17,
        deliver_dt: '2024-03-27',
        sup_name: null,
        sup_address: null,
        sup_phone1: null,
        sup_phone2: null,
        sup_tax_id: null
      }
    ]

    flowAccountService.purchases.mockResolvedValue({
      contactName: 'Untitled Supplier',
      contactAddress: null,
      contactTaxId: null,
      contactPerson: null,
      contactEmail: '',
      publishedOn: '2024-03-27',
      creditDays: '0',
      dueDate: '2024-03-27',
      salesName: '',
      reference: 'PO2024030121',
      isVatInclusive: false,
      totalAfterDiscount: 440,
      isVat: false,
      vatAmount: '0.00',
      grandTotal: 440,
      internalNotes: 'PO: PO2024030121 \\n InvoiceNo: ',
      documentStructureType: 'SimpleDocument',
      items: [
        {
          type: 3,
          name: 'เบียร์อาซาฮี 330 cc.',
          unitName: 'btl',
          quantity: '2.0000000',
          pricePerUnit: '120.00',
          total: 240
        },
        {
          type: 3,
          name: 'เบียร์ Kirin 330cc.',
          unitName: 'btl',
          quantity: '2.0000000',
          pricePerUnit: '100.00',
          total: 200
        }
      ],
      externalDocumentId: 'foodstory-1333612',
      saleAndPurchaseChannel: 'foodstory'
    })
    const result = await flowAccountService.purchases(
      method,
      accessToken,
      branchData,
      unit_object,
      inventoryList
    )

    expect(result).toEqual({
      contactName: 'Untitled Supplier',
      contactAddress: null,
      contactTaxId: null,
      contactPerson: null,
      contactEmail: '',
      publishedOn: '2024-03-27',
      creditDays: '0',
      dueDate: '2024-03-27',
      salesName: '',
      reference: 'PO2024030121',
      isVatInclusive: false,
      totalAfterDiscount: 440,
      isVat: false,
      vatAmount: '0.00',
      grandTotal: 440,
      internalNotes: 'PO: PO2024030121 \\n InvoiceNo: ',
      documentStructureType: 'SimpleDocument',
      items: [
        {
          type: 3,
          name: 'เบียร์อาซาฮี 330 cc.',
          unitName: 'btl',
          quantity: '2.0000000',
          pricePerUnit: '120.00',
          total: 240
        },
        {
          type: 3,
          name: 'เบียร์ Kirin 330cc.',
          unitName: 'btl',
          quantity: '2.0000000',
          pricePerUnit: '100.00',
          total: 200
        }
      ],
      externalDocumentId: 'foodstory-1333612',
      saleAndPurchaseChannel: 'foodstory'
    })
  })
})

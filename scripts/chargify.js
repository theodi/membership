function hideRecurringLineItem(){
  $('#summary-recurring-charges').hide();
  $('.line-item_tax').hide();
  $('.component-info').hide()
  $('.line-item_component').each(function(){
    var txt = $(this).text();
    $(this).text(txt.split(":")[0]);
  })
}

function checkMinAmount(f) {
  return function(arg) {
    if (parseInt($('#component_allocated_quantity_152654').val()) > 0) {
      f.call(this, arg)
    } else {
      alert('The minimum amount you can choose to pay is £1')
      $('#component_allocated_quantity_152654').val(1)
      f.call(this, arg)
    }
  }
}

$(document).bind("afterSummaryRefresh", hideRecurringLineItem);

$(function(){
  $('label[for="subscription_payment_profile_attributes_billing_zip"]').text("Postcode");
  $('#accept_terms').prop('checked', true);
  $('#subscription_submit').val('Join the ODI')

  // Replace number field with dropdown

  $('.quantity_component_number_field').replaceWith('<select id="' +  $('.quantity_component_number_field').attr('id') + '" name="' + $('.quantity_component_number_field').attr('name') + '" class="subdivision_select quantity_component_number_field">' +
    '<option value="1">£1</option>' +
    '<option value="2">£2</option>' +
    '<option value="5">£5</option>' +
    '<option value="10">£10</option>' +
    '<option value="20">£20</option>' +
    '<option value="30" selected="selected">£30</option>' +
    '<option value="40">£40</option>' +
    '<option value="50">£50</option>' +
    '<option value="60">£60</option>' +
    '<option value="70">£70</option>' +
    '<option value="80">£80</option>' +
    '<option value="90">£90</option>' +
    '<option value="100">£100</option>' +
  '</select>');

  $('.quantity_component_number_field').change(function() {
    updateSummaryDetails(true)
  })

  // Autopopulate pay what you want
  updateSummaryDetails(true);

  // Hide Update Totals button
  $('#apply_component_button').parent('p').addClass('hidden')

  // Automatically verify coupon code if added via a URL
  if (getUrlParam('coupon_code') != '') {
    $('#coupon_button').trigger('click')
  }

  // Check a user has paid at least £1
  updateSummaryDetails = checkMinAmount(updateSummaryDetails)

  // Move elements to the right place

  $('#contact_info').add($('#contact_info').prev('h2')).wrapAll('<div id="my_contact" class="fieldset"></div>')
  $('#component_configuration').add($('#component_configuration').prev('h2')).wrapAll('<div id="my_plan" class="fieldset"></div>')
  $('.section_two').add($('.section_two').prev('h2')).wrapAll('<div id="my_tax" class="fieldset"></div>')
  $('#billing_info').add($('#billing_info').prev('h2')).wrapAll('<div id="my_billing" class="fieldset"></div>')
  $('#billing_address').add($('#billing_address').prev('h2')).wrapAll('<div id="my_billing_address" class="fieldset"></div>')

  contactDetails = $('#my_contact')
  plan = $('#my_plan')
  summary = $('#summary')
  tax = $('#my_tax')
  billingInfo = $('#my_billing')
  billingAddress = $('#my_billing_address')

  // Add benefits

  benefits = '<h2 id="benfits">Members benefit from:</h2>' +
  '<ul id="benefits_list">' +
    '<li>invitations to events and open evenings organised by the ODI and beyond</li>' +
    '<li>opportunities to promote your own news and events across the network</li>' +
    '<li>updates up to twice a month from the world of data and open innovation</li>' +
    '<li>30% discount on all our courses</li>' +
    '<li>20% reduction on our annual ODI Summit</li>' +
  '</ul>'

  $(benefits).insertAfter($('#subscription_ref'))

  summary.addClass('fieldset')

  contactDetails.insertAfter($(benefits))
  plan.insertAfter(contactDetails)
  summary.insertAfter(plan)
  billingInfo.insertAfter(summary)
  billingAddress.insertAfter(billingInfo)

  // Hide tax
  tax.addClass('hidden')

  // Move Sector field

  $('#metafield_row_13320 p').attr('class','right')
  $('#metafield_row_13320 p').insertAfter($('#contact_info p:last'))
  $('#metafield_row_13320').addClass('hidden')

  // Move nodes field

  nodeWrapper = $('<div id="nodes" class="fieldset"></div>')
  nodeWrapper.append($('<h2><span>A</span>re you affiliated with an <span>ODI</span> Node?</h2>'))

  nodeSection = $('<div class="section_four"></div>')
  nodeWrapper.append(nodeSection)

  input = $('#metafield_row_13830').find('input')
  nodes = ['Aberdeen','Accra','Athens','Belfast','Birmingham','Brasilia','Bristol','Cairo','Cardiff','Cornwall','Devon','Dubai','Galway','Gothenburg','Hampshire','Leeds','Madrid','Osaka','Ottawa','Paris','Queensland','Rio','Riyadh','Rome','Seoul','St Petersburg','Toronto','Trento','Vienna']
  select = $('<select>')
  select.attr('name', input.attr('name'))
  select.attr('id', input.attr('id'))
  select.append('<option value="">Please Select</option>')

  $.each(nodes, function(i, node) {
    option = $('<option>' + node + '</option>')
    if (getUrlParam('coupon_code').match(new RegExp('ODI' + node.replace(' ', '') , 'i'))) {
      option.attr('selected', 'selected')
    }
    select.append(option)
  })

  $('#contact_info').append($('#metafield_row_13830'))
  input.replaceWith(select)

  nodeSection.append($('#metafield_row_13830'))

  nodeWrapper.insertAfter('#my_contact')

  // Change Radio buttons to checkbox

  $('#metafield_row_13843 .radio ul').remove()
  $('#metafield_row_13843 .radio legend').remove()
  $('#metafield_row_13843 .radio').append('<input type="checkbox" id="subscription[metafields][13843]" name="subscription[metafields][13843]" class="terms" value="Yes" />')
  $('<label for="subscription[metafields][13843]" id="newsletter"> <span>S</span>ubscribe to our newsletter?</label>').insertAfter(('#metafield_row_13843 .radio input'))

  // Autopopulate Billing name
  $('#subscription_customer_attributes_first_name').keyup(function() {
    $('#subscription_payment_profile_attributes_first_name').val($(this).val())
  })

  $('#subscription_customer_attributes_last_name').keyup(function() {
    $('#subscription_payment_profile_attributes_last_name').val($(this).val())
  })

  // Text
  $('#my_plan h2').html('Choose what to pay')
  $('label[for=subscription_customer_attributes_organization]').text('Organisation')
  $('label[for=subscription_payment_profile_attributes_expiration_month]').text('Expiry')

  // Sentence case all labels and titles
  $('label, h2').each(function() {
    match = $(this).text().match(/[a-z]/i)
    if (match) {
      $(this).html($(this).text().replace(match[0], '<span>' + match[0] + '</span>'))
    }
  })

})

$(document).bind("afterSummaryRefresh", function() {
  purchaseSummary = $('#summary h2')
  match = purchaseSummary.text().match(/[a-z]/i)
  purchaseSummary.html(purchaseSummary.text().replace(match[0], '<span>' + match[0] + '</span>'))
});

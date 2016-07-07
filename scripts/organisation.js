var sectorField = '13858';
var nodeField = '13860';
var newsletterField = '13859';
var repField = '13856'
var companyField = '13857'

$(function(){
  $('label[for="subscription_payment_profile_attributes_billing_zip"]').text("Postcode");
  $('#accept_terms').prop('checked', true);
  $('#subscription_submit').val('Join the ODI')

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

  $(benefits).insertAfter($('#token'))

  summary.addClass('fieldset')

  contactDetails.insertAfter('#benefits_list')
  plan.insertAfter(contactDetails)
  summary.insertAfter(plan)
  billingInfo.insertAfter(summary)
  billingAddress.insertAfter(billingInfo)

  $('#metafield_row_'+ sectorField +' p').attr('class','right')
  $('#metafield_row_'+ sectorField +' p').insertAfter($('#contact_info p:last'))
  $('#metafield_row_'+ sectorField +'').addClass('hidden')

  $('#metafield_row_'+ newsletterField +' .radio ul').remove()
  $('#metafield_row_'+ newsletterField +' .radio legend').remove()
  $('#metafield_row_'+ newsletterField +' .radio').append('<input type="checkbox" id="subscription[metafields]['+ newsletterField +']" name="subscription[metafields]['+ newsletterField +']" class="terms" value="Yes" />')
  $('<label for="subscription[metafields]['+ newsletterField +']" id="newsletter"> <span>S</span>ubscribe to our newsletter?</label>').insertAfter(('#metafield_row_'+ newsletterField +' .radio input'))

  // Autopopulate Billing name
  $('#subscription_customer_attributes_first_name').keyup(function() {
    $('#subscription_payment_profile_attributes_first_name').val($(this).val())
  })

  $('#subscription_customer_attributes_last_name').keyup(function() {
    $('#subscription_payment_profile_attributes_last_name').val($(this).val())
  })

  // Sentence case all labels and titles
  $('label, h2').each(function() {
    match = $(this).text().match(/[a-z]/i)
    if (match) {
      $(this).html($(this).text().replace(match[0], '<span>' + match[0] + '</span>'))
    }
  })

  // Change Radio buttons to checkbox

  $('#metafield_row_'+ repField +' .radio ul').remove()
  $('#metafield_row_'+ repField +' .radio legend').remove()
  $('#metafield_row_'+ repField +' .radio').append('<input type="checkbox" id="subscription[metafields]['+ repField +']" name="subscription[metafields]['+ repField +']" class="terms" value="Yes" />')
  $('<label for="subscription[metafields]['+ repField +']" id="newsletter"> <span>T</span>ick this box if you are happy to be contacted by our regional rep</label>').insertAfter(('#metafield_row_'+ repField +' .radio input'))

  $('#metafield_row_'+ companyField +'').insertAfter($('#contact_info div.row:last'))
  //$('#metafield_row_'+ companyField +'').addClass('hidden')
})

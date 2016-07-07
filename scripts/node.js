$(function(){
  $('label[for="subscription_payment_profile_attributes_billing_zip"]').text("Postcode");
  $('#accept_terms').prop('checked', true);
  $('#subscription_submit').val('Join the ODI')

  // Move elements to the right place

  $('#contact_info').add($('#contact_info').prev('h2')).wrapAll('<div id="my_contact" class="fieldset"></div>')
  $('#component_configuration').add($('#component_configuration').prev('h2')).wrapAll('<div id="my_plan" class="fieldset"></div>')
  $('.section_two').add($('.section_two').prev('h2')).wrapAll('<div id="my_tax" class="fieldset"></div>')

  contactDetails = $('#my_contact')
  plan = $('#my_plan')
  summary = $('#summary')
  tax = $('#my_tax')

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

  summary.addClass('hidden')

  // Hide tax
  tax.addClass('hidden')

  // Move Sector field

  $('#metafield_row_13320 p').attr('class','right')
  $('#metafield_row_13320 p').insertAfter($('#contact_info p:last'))
  $('#metafield_row_13320').addClass('hidden')

  // Change Radio buttons to checkbox

  $('#metafield_row_13843 .radio ul').remove()
  $('#metafield_row_13843 .radio legend').remove()
  $('#metafield_row_13843 .radio').append('<input type="checkbox" id="subscription[metafields][13843]" name="subscription[metafields][13843]" class="terms" value="Yes" />')
  $('<label for="subscription[metafields][13843]" id="newsletter"> <span>S</span>ubscribe to our newsletter?</label>').insertAfter(('#metafield_row_13843 .radio input'))

  // Sentence case all labels and titles
  $('label, h2').each(function() {
    match = $(this).text().match(/[a-z]/i)
    if (match) {
      $(this).html($(this).text().replace(match[0], '<span>' + match[0] + '</span>'))
    }
  })

})

class EditableShortText < EditableElement

  ## fields ##
  field :content

  ## callbacks ##
  before_validation :blank_content, :unless => :override_original?

  ## validations ##
  validates_each :content, :unless => :override_original? do |record, attribute, value|
    value = record[attribute]
    record.errors.add attribute, 'must be blank if inherited and not overridden.' unless value.blank?
  end

  ## methods ##

  def content
    el = inherited_editable_element_or_self
    el.read_attribute(:content).blank? ? el.default_content : el.read_attribute(:content)
  end

  protected

  def blank_content
    self.write_attribute(:content, nil)
  end

end
class EditableShortText < EditableElement

  ## fields ##
  field :content

  ## methods ##

  def content
    el = inherited_editable_element_or_self
    el.read_attribute(:content).blank? ? el.default_content : el.read_attribute(:content)
  end

end